// Direct client-side call to OpenWeatherMap. Requires VITE_OPENWEATHER_API_KEY
// in your .env file. Same exposure tradeoff noted in geminiClient.js applies
// — this key is visible in the browser.

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function fetchWeather(lat, lon) {
  if (!API_KEY) return null;
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return {
      location: data.name,
      condition: data.weather?.[0]?.description,
      tempC: data.main?.temp,
      feelsLikeC: data.main?.feels_like,
      humidity: data.main?.humidity,
    };
  } catch {
    return null;
  }
}

export async function getWeatherContext() {
  if (!navigator.geolocation) return null;
  try {
    const position = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 })
    );
    return await fetchWeather(position.coords.latitude, position.coords.longitude);
  } catch {
    return null;
  }
}
