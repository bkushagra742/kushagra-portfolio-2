// Serverless function (Vercel-style). Set OPENWEATHER_API_KEY in your
// deployment's Environment Variables. Called by Kanuu only when a visitor
// asks a weather-related question and grants browser location permission.

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server is missing OPENWEATHER_API_KEY" });
  }

  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.status(400).json({ error: "lat and lon query params are required" });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const weatherRes = await fetch(url);
    if (!weatherRes.ok) {
      return res.status(502).json({ error: "Weather service failed to respond" });
    }
    const data = await weatherRes.json();

    return res.status(200).json({
      location: data.name,
      condition: data.weather?.[0]?.description,
      tempC: data.main?.temp,
      feelsLikeC: data.main?.feels_like,
      humidity: data.main?.humidity,
    });
  } catch (err) {
    console.error("weather error:", err);
    return res.status(500).json({ error: "Unexpected server error" });
  }
}
