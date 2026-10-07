function WeatherDisplay(props) {
    return (
      <section className="weather-card">
        <h2>{props.weather.name}</h2>
  
        <div className="weather-metrics">
          <div className="metric">
            <span className="metric-label">Temperature</span>
            <span className="metric-value">
              {Math.round(props.weather.main?.temp)} °F
            </span>
          </div>
  
          <div className="metric">
            <span className="metric-label">Humidity</span>
            <span className="metric-value">
              {props.weather.main?.humidity}%
            </span>
          </div>
  
          <div className="metric">
            <span className="metric-label">Wind Speed</span>
            <span className="metric-value">
              {props.weather.wind?.speed} mph
            </span>
          </div>
        </div>
      </section>
    );
  }
  
  export default WeatherDisplay;