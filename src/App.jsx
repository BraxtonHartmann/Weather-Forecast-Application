import { useCallback, useState } from 'react'
import WeatherDisplay from './components/weatherDisplay';

import './App.css'


function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "c0f493ff920961115be0b8698e7a7e00";

  const fetchWeather = useCallback(async (city) => {
    if (!city.trim()) {
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=imperial`
      );
      if (!response.ok) {
        throw new Error("Unable to find weather for city: " + city);
      }

      const data = await response.json();
      setWeather(data)

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  function submitHandler(event) {
    event.preventDefault();
    fetchWeather(city)
  }


  return (
    <main className="weather-app">
      <section className="weather-container">
        <h1>Weather Forecast</h1>

        <form className="search-form" onSubmit={submitHandler}>
          <input
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="Enter a city"
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {isLoading && <p className="status">Loading weather...</p>}
        {error && <p className="error">{error}</p>}
        {weather && <WeatherDisplay weather={weather} />}
      </section>
    </main>
  )
}

export default App
