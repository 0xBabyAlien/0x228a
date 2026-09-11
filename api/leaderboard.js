// /api/leaderboard.js
//
// Serverless function (Vercel-style). Stores & retrieves the Asteroids
// high-score leaderboard using Upstash Redis's REST API (no SDK needed).
//
// Requires two environment variables on the deployment:
//   UPSTASH_REDIS_REST_URL
//   UPSTASH_REDIS_REST_TOKEN
// Free tier: https://upstash.com

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const LEADERBOARD_KEY = 'asteroids:leaderboard';
const TOP_N = 10;
const MAX_NAME_LEN = 16;

async function redisCmd(...parts) {
  const url = REDIS_URL + '/' + parts.map(p => encodeURIComponent(p)).join('/');
  const res = await fetch(url, { headers: { Authorization: 'Bearer ' + REDIS_TOKEN } });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.result;
}

function sanitizeName(raw) {
  const name = String(raw || '').trim().slice(0, MAX_NAME_LEN);
  return name.replace(/[^\p{L}\p{N}\s_.-]/gu, '') || 'Anonymous';
}

function toScoreList(flat) {
  const scores = [];
  for (let i = 0; i < flat.length; i += 2) {
    scores.push({ name: flat[i], score: parseInt(flat[i + 1], 10) });
  }
  return scores;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  if (!REDIS_URL || !REDIS_TOKEN) {
    res.status(500).json({ error: 'Leaderboard storage is not configured on the server.' });
    return;
  }

  try {
    if (req.method === 'GET') {
      const flat = await redisCmd('zrevrange', LEADERBOARD_KEY, '0', String(TOP_N - 1), 'withscores');
      res.status(200).json({ scores: toScoreList(flat) });
      return;
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const name = sanitizeName(body.name);
      const score = Math.max(0, Math.min(999999, parseInt(body.score, 10) || 0));

      // GT = only overwrite if the new score beats the player's stored best
      // (classic "best score per name" leaderboard, not full history).
      await redisCmd('zadd', LEADERBOARD_KEY, 'GT', 'CH', String(score), name);

      const flat = await redisCmd('zrevrange', LEADERBOARD_KEY, '0', String(TOP_N - 1), 'withscores');
      res.status(200).json({ ok: true, scores: toScoreList(flat) });
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    res.status(502).json({ error: err.message || 'Leaderboard request failed.' });
  }
};
