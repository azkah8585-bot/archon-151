export default async function handler(req, res) {
  if (req.method!== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { prompt } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const data = await r.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Gagal';
    return res.status(200).json({ result: text });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
