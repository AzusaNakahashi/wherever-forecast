import WeatherIcon from "./WeatherIcon";
import sortCityNameToShow from "../../service/sortCityNameToShow";
import styles from "../../styles/weather/hourly.module.scss";
import { useAppSelector } from "../../features/hooks";

const Hourly = ({ weatherType }: { weatherType: string }) => {
  const weather = useAppSelector((state) => state.weather);

  const extractTime = (time) => {
    return new Date(time).toLocaleTimeString("en", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: weather.city.TimeZone.Name,
    });
  };

  return (
    <div
      className={
        weatherType === "hourly"
          ? styles["hourly-weather-container"]
          : `${styles["hourly-weather-container"]} ${styles["hidden"]}`
      }
    >
      <p className={styles["category-title"]}>12 hours</p>
      {weather.hourly.map((forecast, index) => (
        <div key={index} className={styles["hourly-weather-card"]}>
          <div className={styles["summary-container"]}>
            <p>{extractTime(forecast.DateTime)}</p>
            <div className={styles["weather-icon"]}>
              <WeatherIcon
                iconPhrase={sortCityNameToShow(forecast.WeatherIcon)}
              />
            </div>
            <p>{forecast.IconPhrase}</p>
            <p>{Math.round(forecast.Temperature.Value)}°C</p>
          </div>
          <table className={styles["weather-detail-table"]}>
            <thead>
              <tr>
                <th>Feels like</th>
                <th>Wind</th>
                <th>Humidity</th>
                <th>UV</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{Math.round(forecast.RealFeelTemperature.Value)}°C</td>
                <td>
                  {forecast.Wind.Speed.Value}
                  {"km "}
                  {forecast.Wind.Direction.English}
                </td>
                <td>{forecast.RelativeHumidity}%</td>
                <td>{forecast.UVIndexText}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Hourly;
