const TOKENS = {
  USDC: {
    address: "0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    decimals: 6
  },
  USDT: {
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    decimals: 6
  }
};

// keccak256("Transfer(address,address,uint256)")
const TRANSFER_TOPIC =
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a8df53b3ef";

function topicToAddress(topic) {
  return "0x" + topic.slice(-40);
}

function shortAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatUSD(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function formatAmount(value) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0
  }).format(value);
}

function age(timestamp) {
  const seconds = Math.max(0, Math.floor(Date.now() / 1000 - timestamp));
  if (seconds < 60) return `${seconds}s ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

async function rpcCall(rpc, method, params) {
  const response = await fetch(rpc, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params })
  });

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.result;
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=20, stale-while-revalidate=40");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const apiKey = process.env.ALCHEMY_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "ALCHEMY_API_KEY is not configured." });
  }

  const minUsd = Math.max(100000, Number(req.query?.minUsd || 1000000));
  const rpc = `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`;

  try {
    const latestHex = await rpcCall(rpc, "eth_blockNumber", []);
    const latestBlock = parseInt(latestHex, 16);

    // Scan only the latest 10 blocks to keep the API lightweight.
    const fromBlock = Math.max(0, latestBlock - 10);
    const fromHex = "0x" + fromBlock.toString(16);
    const toHex = "0x" + latestBlock.toString(16);

    const transfers = [];

    for (const [symbol, token] of Object.entries(TOKENS)) {
      const logs = await rpcCall(rpc, "eth_getLogs", [
        {
          address: token.address,
          fromBlock: fromHex,
          toBlock: toHex,
          topics: [TRANSFER_TOPIC]
        }
      ]);

      for (const log of logs || []) {
        if (!log.topics || log.topics.length < 3) continue;

        const rawAmount = BigInt(log.data);
        const amount = Number(rawAmount) / Math.pow(10, token.decimals);

        // USDC / USDT are approximately $1, so token amount ≈ USD value.
        const valueUsd = amount;
        if (valueUsd < minUsd) continue;

        const from = topicToAddress(log.topics[1]);
        const to = topicToAddress(log.topics[2]);

        transfers.push({
          symbol,
          amount,
          valueUsd,
          amountFormatted: formatAmount(amount),
          valueFormatted: formatUSD(valueUsd),
          from,
          to,
          fromShort: shortAddress(from),
          toShort: shortAddress(to),
          txHash: log.transactionHash,
          blockNumber: parseInt(log.blockNumber, 16)
        });
      }
    }

    // Resolve block timestamps.
    const blockNumbers = [...new Set(transfers.map(item => item.blockNumber))];
    const timestamps = new Map();

    await Promise.all(
      blockNumbers.map(async blockNumber => {
        const block = await rpcCall(rpc, "eth_getBlockByNumber", [
          "0x" + blockNumber.toString(16),
          false
        ]);
        if (block?.timestamp) {
          timestamps.set(blockNumber, parseInt(block.timestamp, 16));
        }
      })
    );

    const result = transfers
      .map(item => ({
        ...item,
        timestamp: timestamps.get(item.blockNumber) || Math.floor(Date.now() / 1000)
      }))
      .sort((a, b) => b.valueUsd - a.valueUsd)
      .slice(0, 30)
      .map(item => ({ ...item, age: age(item.timestamp) }));

    return res.status(200).json({
      chain: "Ethereum",
      minUsd,
      count: result.length,
      updatedAt: new Date().toISOString(),
      transfers: result
    });
  } catch (error) {
    console.error("Whale Radar:", error);
    return res.status(500).json({
      error: "Unable to read Ethereum whale activity.",
      detail: error.message
    });
  }
}
