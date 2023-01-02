import styles from "../../styles/weather/daily.module.scss";
import WeatherIcon from "./WeatherIcon";
import sortCityNameToShow from "../../service/sortCityNameToShow";
import { useAppDispatch, useAppSelector } from "../../features/hooks";

const Daily = ({ weatherType }: { weatherType: string }) => {
  const weather = useAppSelector((state) => state.weather);

  const extractDate = (time: any) => {
    const newTime = new Date(time).toLocaleDateString("en", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: weather.city.TimeZone.Name,
    });
    return newTime;
  };

  return (
    <div
      className={
        weatherType === "daily"
          ? styles["daily-weather-container"]
          : `${styles["daily-weather-container"]} ${styles["hidden"]}`
      }
    >
      <p className={styles["category-title"]}>5 days</p>
      {weather.daily.DailyForecasts.map((forecast, index) => (
        <div key={index} className={styles["weather-card"]}>
          <p className={styles["date"]}>{extractDate(forecast.Date)}</p>
          <div className={styles["highlight-container"]}>
            <div className={styles["weather-icon"]}>
              <WeatherIcon
                iconPhrase={sortCityNameToShow(forecast.Day.Icon)}
                iconHeight={90}
              />
            </div>
            <p className={styles["temperature"]}>
              {Math.round(forecast.Temperature.Maximum.Value)}°C
            </p>
            <p className={styles["real-feel-temperature"]}>
              Feels like{" "}
              {Math.round(forecast.RealFeelTemperature.Maximum.Value)}
              °C
            </p>
            <p className={styles["weather-description"]}>
              {forecast.Day.IconPhrase}
            </p>
          </div>
          <p className={styles["weather-long-phrase"]}>
            {forecast.Day.LongPhrase}
          </p>
          <div className={styles["detail-table-container"]}>
            <table>
              <thead>
                <tr>
                  <th>Lowest</th>
                  <th>Wind</th>
                  <th>Wind Gust</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{Math.round(forecast.Temperature.Minimum.Value)}°C</td>
                  <td>
                    {forecast.Day.Wind.Speed.Value}
                    {"km "}
                    {forecast.Day.Wind.Direction.English}
                  </td>
                  <td>
                    {forecast.Day.WindGust.Speed.Value} {"km "}
                    {forecast.Day.WindGust.Direction.English}
                  </td>
                </tr>
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <th>Hrs of Sun</th>
                  <th>Cloud Cover</th>
                  <th>Rain</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{forecast.HoursOfSun}h</td>
                  <td>{forecast.Day.CloudCover}%</td>
                  <td>{forecast.Day.RainProbability}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Daily;
