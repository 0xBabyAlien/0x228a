// /api/scan.js
//
// Serverless function (Vercel-style: module.exports = async (req, res) => {...})
// Looks up the latest transactions for a given wallet address on Ethereum
// mainnet using the free Blockscout API and returns a simplified list of
// transaction hashes for the "Scan" window.
//
// No API key required — Blockscout's public REST API is free to use.
// Docs: https://docs.blockscout.com/devs/apis/rest
// Locally opening index.html as a file will NOT work — this only runs
// server-side once deployed.

const BLOCKSCOUT_ENDPOINT = 'https://eth.blockscout.com/api/v2/addresses/';

const ADDRESS_RE = /^0x[a-fA-F0-9]{40}$/;
const MAX_RESULTS = 30;

function shortenHash(hash) {
  if (!hash || hash.length < 14) return hash || '';
  return hash.slice(0, 8) + '…' + hash.slice(-6);
}

function formatType(item, address) {
  // Blockscout's tx_types is an array like ["coin_transfer"], ["token_transfer"],
  // ["contract_call"], ["contract_creation"] ... We map everything down to a
  // small fixed set of categories (send / receive / approve / create / call)
  // so the frontend can translate the label into any supported language.
  const types = Array.isArray(item.tx_types) ? item.tx_types : [];
  if (types.includes('contract_creation')) return 'create';
  if (item.method === 'approve') return 'approve';
  if (types.includes('coin_transfer') || types.includes('token_transfer')) {
    const from = ((item.from && item.from.hash) || '').toLowerCase();
    return from === address.toLowerCase() ? 'send' : 'receive';
  }
  return 'call';
}

function formatAge(isoTimestamp) {
  if (!isoTimestamp) return '—';
  const diffSec = Math.max(0, Math.floor((Date.now() - new Date(isoTimestamp).getTime()) / 1000));
  if (diffSec < 60) return diffSec + 's';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return diffMin + 'm';
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return diffHr + 'h';
  return Math.floor(diffHr / 24) + 'd';
}

module.exports = async (req, res) => {
  // Basic CORS / method guard
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method && req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const address = (req.query && req.query.address || '').trim();
  if (!ADDRESS_RE.test(address)) {
    res.status(400).json({ error: 'A valid wallet address is required (e.g. 0x...).' });
    return;
  }

  try {
    const url = BLOCKSCOUT_ENDPOINT + encodeURIComponent(address) + '/transactions';
    const bsRes = await fetch(url, {
      headers: { 'Accept': 'application/json' }
    });

    if (!bsRes.ok) {
      throw new Error('Blockscout API returned HTTP ' + bsRes.status);
    }

    const data = await bsRes.json();
    const rawHistory = (data && data.items) || [];

    const transactions = rawHistory
      .slice(0, MAX_RESULTS)
      .map(item => {
        const hash = item.hash || '';
        if (!hash) return null;
        return {
          hash,
          hashShort: shortenHash(hash),
          chain: 'eth',
          type: formatType(item, address),
          time: formatAge(item.timestamp)
        };
      })
      .filter(Boolean);

    res.status(200).json({
      address,
      count: transactions.length,
      updatedAt: new Date().toISOString(),
      transactions
    });
  } catch (err) {
    res.status(502).json({ error: err.message || 'Failed to fetch transaction data from Blockscout.' });
  }
};
