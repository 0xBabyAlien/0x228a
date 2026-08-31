// /api/whale-radar.js
//
// Serverless function (Vercel-style: module.exports = async (req, res) => {...})
// Scans the last N Ethereum mainnet blocks for large USDC / USDT transfers
// using the Alchemy "alchemy_getAssetTransfers" API.
//
// Requires an environment variable ALCHEMY_API_KEY to be set on the
// deployment (e.g. Vercel Project Settings -> Environment Variables).
// Locally opening index.html as a file will NOT work — this only runs
// server-side once deployed.

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

// Well-known Ethereum mainnet stablecoin contracts.
const TOKENS = {
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': { symbol: 'USDC' },
  '0xdac17f958d2ee523a2206206994597c13d831ec7': { symbol: 'USDT' }
};
const TOKEN_ADDRESSES = Object.keys(TOKENS);

const BLOCKS_TO_SCAN = 10;   // "last 10 blocks", matches the UI copy
const MIN_USD = 500000;      // minimum transfer size to be considered a "whale" move
const MAX_RESULTS = 25;      // cap the list returned to the client

function shortenAddress(addr) {
  if (!addr || addr.length < 10) return addr || '';
  return addr.slice(0, 6) + '…' + addr.slice(-4);
}

function formatUsd(value) {
  const abs = Math.abs(value);
  if (abs >= 1e9) return '$' + (value / 1e9).toFixed(2) + 'B';
  if (abs >= 1e6) return '$' + (value / 1e6).toFixed(2) + 'M';
  if (abs >= 1e3) return '$' + (value / 1e3).toFixed(1) + 'K';
  return '$' + value.toFixed(0);
}

function formatAge(blockTimestampIso) {
  const then = new Date(blockTimestampIso).getTime();
  if (!isFinite(then)) return '—';
  const diffSec = Math.max(0, Math.floor((Date.now() - then) / 1000));
  if (diffSec < 60) return diffSec + 's';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return diffMin + 'm';
  const diffHr = Math.floor(diffMin / 60);
  return diffHr + 'h';
}

async function alchemyRpc(method, params) {
  const url = 'https://eth-mainnet.g.alchemy.com/v2/' + ALCHEMY_API_KEY;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params })
  });
  const json = await res.json();
  if (json.error) {
    throw new Error(json.error.message || 'Alchemy RPC error');
  }
  return json.result;
}

module.exports = async (req, res) => {
  // Basic CORS / method guard
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method && req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!ALCHEMY_API_KEY) {
    res.status(500).json({ error: 'ALCHEMY_API_KEY is not configured on the server.' });
    return;
  }

  try {
    // 1. Get latest block number, compute the scan window.
    const latestHex = await alchemyRpc('eth_blockNumber', []);
    const latestBlock = parseInt(latestHex, 16);
    const fromBlock = '0x' + Math.max(0, latestBlock - BLOCKS_TO_SCAN + 1).toString(16);

    // 2. Pull ERC-20 transfers for USDC/USDT in that window.
    const result = await alchemyRpc('alchemy_getAssetTransfers', [{
      fromBlock,
      toBlock: 'latest',
      contractAddresses: TOKEN_ADDRESSES,
      category: ['erc20'],
      withMetadata: true,
      excludeZeroValue: true,
      order: 'desc',
      maxCount: '0x3e8' // 1000
    }]);

    const rawTransfers = (result && result.transfers) || [];

    // 3. Filter to whale-sized transfers, map to the shape the UI expects.
    const transfers = rawTransfers
      .map(t => {
        const contract = (t.rawContract && t.rawContract.address || '').toLowerCase();
        const meta = TOKENS[contract];
        const value = typeof t.value === 'number' ? t.value : parseFloat(t.value);
        if (!meta || !isFinite(value)) return null;
        return {
          symbol: meta.symbol,
          valueUsd: value, // stablecoins ~= 1:1 USD
          valueFormatted: formatUsd(value),
          from: t.from,
          to: t.to,
          fromShort: shortenAddress(t.from),
          toShort: shortenAddress(t.to),
          age: formatAge(t.metadata && t.metadata.blockTimestamp)
        };
      })
      .filter(t => t && t.valueUsd >= MIN_USD)
      .sort((a, b) => b.valueUsd - a.valueUsd)
      .slice(0, MAX_RESULTS)
      .map(({ valueUsd, ...rest }) => rest); // drop the raw numeric field before sending

    res.status(200).json({
      count: transfers.length,
      minUsd: MIN_USD,
      updatedAt: new Date().toISOString(),
      transfers
    });
  } catch (err) {
    res.status(502).json({ error: err.message || 'Failed to fetch whale transfer data.' });
  }
};
