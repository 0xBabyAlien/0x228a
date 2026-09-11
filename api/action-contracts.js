// /api/action-contracts.js
//
// Serverless function (Vercel-style). Proxies the public "capabilities"
// endpoint of the Chesto Action Contracts API so the browser can read it
// without CORS issues. No API key required (public endpoint).
// Docs: https://chesto.ai/

const CHESTO_ENDPOINT = 'https://chesto.ai/api/action-contracts/capabilities';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method && req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const upstream = await fetch(CHESTO_ENDPOINT, {
      headers: { 'Accept': 'application/json' }
    });
    if (!upstream.ok) {
      throw new Error('Chesto API returned HTTP ' + upstream.status);
    }
    const data = await upstream.json();

    // Shape isn't confirmed yet, so pass it through as-is and let the
    // frontend defensively locate the list of capabilities.
    res.status(200).json({
      updatedAt: new Date().toISOString(),
      raw: data
    });
  } catch (err) {
    res.status(502).json({ error: err.message || 'Failed to fetch capabilities from Chesto.' });
  }
};
