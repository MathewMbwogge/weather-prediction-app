import React, { useState, useEffect } from "react";
import "./Weather.css";
import axios from "axios";

const FetchWeather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [fetcher, setFetcher] = useState(false)
  const [error, setError] = useState("");

  /* const apiKey = process.env.REACT_APP_API_KEY; */

  useEffect(() => {
    if (fetcher) {
      const getWeather = async () => {
        try {
          const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=29d78fa5f8f14bf59c483811250803&q=${city}&days=7&aqi=no&alerts=no`);
          setWeather(response.data);
          setError("");
        } catch (err) {
          setError("City not found");
          setWeather(null);
        }
      }
      getWeather();
      setFetcher(false);
    }
  }, [fetcher]);

  const handleClick = () => {
    setFetcher(true);
  };

  return (
    <div>
      <h2>Want to know the weather</h2>
      <input
        type="text"
        className="inputbox"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="button" onClick={handleClick}>Get Weather</button>
      {error && <p>{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>Today's Weather</h2>
          <h3>{weather.location.region}</h3>
          <h3>{weather.location.localtime}</h3>
          <div className="header">
            <div className="header-left">
              <img className="weather-icon-large" src={weather.current.condition.icon} data-current-icon />
              <div className="weather-current-temp">
                <span data-current-temp>{weather.current.temp_c}</span>&deg;
                <span data-current-temp> {weather.current.condition.text}</span>
              </div>
            </div>
            <div className="header-right">
              <div className="info-group">
                <div className="label">Feels Like</div>
                <div><span data-current-high>{weather.current.feelslike_c}</span>&deg;</div>
              </div>
              <div className="info-group">
                <div className="label">Heat Index</div>
                <div><span data-current-fl-high>{weather.current.heatindex_c}</span>&deg;</div>
              </div>
              <div className="info-group">
                <div className="label">Wind Speed</div>
                <div><span data-current-wind>{weather.current.wind_mph}</span>mph</div>
              </div>
              <div className="info-group">
                <div className="label">Humidity</div>
                <div><span data-current-low>{weather.current.humidity}</span>&deg;</div>
              </div>
              <div className="info-group">
                <div className="label">Pressure</div>
                <div><span data-current-fl-low>{weather.current.pressure_in}</span>&deg;</div>
              </div>
              <div className="info-group">
                <div className="label">Precipitation</div>
                <div><span data-current-precip>2</span><span className="value-sub-info">{weather.current.precip_in}mm</span></div>
              <div>
            </div>
          </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default FetchWeather;