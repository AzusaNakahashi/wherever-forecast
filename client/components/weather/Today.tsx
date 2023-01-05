import { useAppSelector } from "../../features/hooks";
import sortImageCategory from "../../service/sortImageCategory";
import styles from "../../styles/weather/today.module.scss";
import WeatherIcon from "./WeatherIcon";

const Today = ({ weatherType }: { weatherType: string }) => {
  const weather = useAppSelector((state) => state.weather);

  const extractTime = (time: any) => {
    return new Date(time).toLocaleTimeString("en", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: weather.city.TimeZone.Name,
    });
  };

  // used to change bg color depending on the condition level value
  // e.g. air quality level "Moderate" has green bg color
  const sortAirQuality = (levelValue: string) => {
    switch (levelValue) {
      case "Good":
        return "blue";
      case "Moderate":
        return "green";
      case "Unhealthy (Sensitive)":
        return "yellow";
      case "Unhealthy":
        return "orange";
      case "Very unhealthy":
        return "red";
      case "Hazardous":
        return "wine";
    }
  };

  const sortPollenLevel = (levelValue: string) => {
    switch (levelValue) {
      case "Low":
        return "blue";
      case "Moderate":
        return "green";
      case "High":
        return "orange";
      case "Very High":
        return "red";
      case "Extreme":
        return "wine";
    }
  };

  const sortUVLevel = (levelValue: string) => {
    switch (levelValue) {
      case "Low":
        return "blue";
      case "Moderate":
        return "green";
      case "High":
        return "orange";
      case "Very High":
        return "red";
      case "Extreme":
        return "wine";
    }
  };

  return (
    <div
      className={
        weatherType === "today"
          ? styles["today-weather-container"]
          : `${styles["today-weather-container"]} ${styles["hidden"]}`
      }
    >
      <div className={styles["current-highlight-container"]}>
        <p className={styles["category-title"]}>Current</p>
        <div className={styles["layout-container"]}>
          <div className={styles["weather-icon"]}>
            <WeatherIcon
              iconPhrase={sortImageCategory(weather.current.WeatherIcon)}
            />
          </div>
          <p className={styles["temperature"]}>
            {Math.round(weather.current.ApparentTemperature.Metric.Value)}°C
          </p>
        </div>
        <p className={styles["real-feel-temperature"]}>
          Feels like{" "}
          {Math.round(weather.current.RealFeelTemperature.Metric.Value)}°C
        </p>
        <h2 className={styles["weather-condition"]}>
          {weather.current.WeatherText}
        </h2>
      </div>
      <div className={styles["current-detail-container"]}>
        {/*  1st table */}
        <table>
          <thead>
            <tr>
              <th>Wind</th>
              <th>Wind Gust</th>
              <th>Humidity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {weather.current.Wind.Speed.Metric.Value}km{" "}
                {weather.current.Wind.Direction.English}
              </td>
              <td>{weather.current.WindGust.Speed.Metric.Value}km</td>
              <td>{weather.current.RelativeHumidity}%</td>
            </tr>
          </tbody>
        </table>
        {/*  2nd table */}
        <table>
          <thead>
            <tr>
              <th>Sunrise</th>
              <th>Sunset</th>
              <th>Visibility</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{extractTime(weather.daily.DailyForecasts[0].Sun.Rise)}</td>
              <td>{extractTime(weather.daily.DailyForecasts[0].Sun.Set)}</td>
              <td>{weather.current.Visibility.Metric.Value} km</td>
            </tr>
          </tbody>
        </table>
        {/*  3rd table */}
        <table>
          <thead>
            <tr>
              <th>UV</th>
              <th>Air Quality</th>
              <th>Pollen</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{weather.current.UVIndexText}</td>
              <td>
                {weather.daily.DailyForecasts[0].AirAndPollen[0].Category}
              </td>
              <td>
                {weather.daily.DailyForecasts[0].AirAndPollen[4].Category}
              </td>
            </tr>
            <tr>
              <td className={styles[sortUVLevel(weather.current.UVIndexText)]}>
                {weather.current.UVIndex}
              </td>
              <td
                className={
                  styles[
                    sortAirQuality(
                      weather.daily.DailyForecasts[0].AirAndPollen[0].Category
                    )
                  ]
                }
              >
                {weather.daily.DailyForecasts[0].AirAndPollen[0].Value}
              </td>
              <td
                className={
                  styles[
                    sortPollenLevel(
                      weather.daily.DailyForecasts[0].AirAndPollen[4].Category
                    )
                  ]
                }
              >
                {weather.daily.DailyForecasts[0].AirAndPollen[4].Value}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {1 < 18 ? (
        <>
          <div className={styles["near-future-weather"]}>
            <p>This Afternoon</p>
            <div className={styles["weather-icon"]}>
              <WeatherIcon
                iconPhrase={sortImageCategory(
                  weather.daily.DailyForecasts[0].Day.Icon
                )}
              />
            </div>
            <p className={styles["weather-condition"]}>
              {weather.daily.DailyForecasts[0].Day.IconPhrase}
            </p>
          </div>
          <div className={styles["near-future-weather"]}>
            <p>Tonight</p>
            <div className={styles["weather-icon"]}>
              <WeatherIcon
                iconPhrase={sortImageCategory(
                  weather.daily.DailyForecasts[0].Night.Icon
                )}
              />
            </div>
            <p className={styles["weather-condition"]}>
              {weather.daily.DailyForecasts[0].Night.IconPhrase}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className={styles["near-future-weather"]}>
            <p>Tonight</p>
            <div className={styles["weather-icon"]}>
              <WeatherIcon
                iconPhrase={sortImageCategory(
                  weather.daily.DailyForecasts[0].Night.Icon
                )}
              />
            </div>
            <p className={styles["weather-condition"]}>
              {weather.daily.DailyForecasts[0].Night.IconPhrase}
            </p>
          </div>
          <div className={styles["near-future-weather"]}>
            <p>Tomorrow</p>
            <div className={styles["weather-icon"]}>
              <WeatherIcon
                iconPhrase={sortImageCategory(
                  weather.daily.DailyForecasts[1].Day.Icon
                )}
              />
            </div>
            <p className={styles["weather-condition"]}>
              {weather.daily.DailyForecasts[1].Day.IconPhrase}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Today;
