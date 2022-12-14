import Link from "next/link";
import styles from "../../styles/home/home.module.scss";
import sortCityNameToShow from "../../service/sortCityNameToShow";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { useState } from "react";
import { setWeather } from "../../features/weather";

const WeatherInfo = () => {
  const map = useAppSelector((state) => state.map);
  const weather = useAppSelector((state) => state.weather);
  const dispatch = useAppDispatch();

  const extractTime = (time: string) => {
    return new Date(time).toLocaleTimeString("en", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: weather.city?.TimeZone.Name,
    });
  };

  useState(() => {
    if (!weather.status && map.mapOptions.coordinates) {
      dispatch(setWeather(map.mapOptions.coordinates));
    }
  });

  console.log(weather);
  return (
    <>
      {weather.status === "SUCCESS" ? (
        <div className={styles["weather"]}>
          <p className={styles["location"]}>
            {weather.city && sortCityNameToShow(weather.city)}
          </p>
          <div className={styles["current-summary"]}>
            <p className={styles["title"]}>Current Conditions</p>
            <p className={styles["temperature"]}>
              {Math.round(weather.current?.ApparentTemperature.Metric.Value)}°C
            </p>
            <p className={styles["weather-condition"]}>
              {weather.current?.WeatherText}
            </p>
            <p className={styles["real-feel-temperature"]}>
              Feels like{" "}
              {Math.round(weather.current?.RealFeelTemperature.Metric.Value)}°C
            </p>
          </div>
          <div className={styles["today-weather"]}>
            <div className={styles["today-summary"]}>
              <p className={styles["title"]}>Today</p>
              <p className={styles["temperature"]}>
                {Math.round(
                  weather.daily?.DailyForecasts[0].Temperature.Maximum.Value
                )}
                °C
              </p>
              <p className={styles["weather-condition"]}>
                {weather.daily?.DailyForecasts[0].Day.IconPhrase}
              </p>
              <p className={styles["real-feel-temperature"]}>
                Feels like{" "}
                {Math.round(
                  weather.daily?.DailyForecasts[0].RealFeelTemperature.Maximum
                    .Value
                )}
                °C
              </p>
            </div>
            <div className={styles["condition-table"]}>
              <table>
                <thead>
                  <tr>
                    <th>Low</th>
                    <th>Hrs of Sun</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {Math.round(
                        weather.daily?.DailyForecasts[0].Temperature.Minimum
                          .Value
                      )}
                      {"°C"}
                    </td>
                    <td>
                      {weather.daily?.DailyForecasts[0].HoursOfSun}
                      {weather.daily?.DailyForecasts[0].HoursOfSun > 1
                        ? "hrs"
                        : "hr"}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table>
                <thead>
                  <tr>
                    <th>UV</th>
                    <th>Wind</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {" "}
                      {
                        weather.daily?.DailyForecasts[0].AirAndPollen[5]
                          .Category
                      }
                    </td>
                    <td>
                      {weather.daily?.DailyForecasts[0].Day.Wind.Speed.Value}
                      {"km "}
                      {
                        weather.daily?.DailyForecasts[0].Day.Wind.Direction
                          .English
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
              <table>
                <thead>
                  <tr>
                    <th>Air Quality</th>
                    <th>Sunset</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {
                        weather.daily?.DailyForecasts[0].AirAndPollen[0]
                          .Category
                      }
                    </td>
                    <td>
                      {extractTime(weather.daily?.DailyForecasts[0].Sun.Set)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Link href="/weather">
            <button className={styles["see-more-button"]}>SEE MORE</button>
          </Link>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default WeatherInfo;
