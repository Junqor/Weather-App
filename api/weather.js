// api/weather.js
export default async function handler(req, res) {
  const apiKey = process.env.API_KEY;
  const { city } = req.query;

  if (!city) {
      return res.status(400).json({ error: "City is required" });
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${city}&appid=${apiKey}`;

  try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.status === 404) {
          return res.status(404).json({ error: "City not found" });
      }

      res.status(200).json(data);
  } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
  }
}
