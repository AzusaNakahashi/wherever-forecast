import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { setCurrentLocationCoordinates, clearMap } from "../../features/map";
import { setWeather } from "../../features/weather";
import sortCityNameToShow from "../../service/sortCityNameToShow";
import sortImageCategory from "../../service/sortImageCategory";
import Link from "next/link";
import Image from "next/image";
import Spinner from "../pageState/Spinner";
import Today from "./Today";
import Hourly from "./Hourly";
import Daily from "./Daily";
import CloseIcon from "../../public/page-icons/close-icon.svg";
import styles from "../../styles/weather/wrapper.module.scss";
import bgStyles from "../../styles/weather/background.module.scss";
import Error from "../pageState/Error";

const Weather = () => {
  const dispatch = useAppDispatch();
  const weather = useAppSelector((state) => state.weather);
  const map = useAppSelector((state) => state.map);
  const [weatherType, setWeatherType] = useState("today");

  useEffect(() => {
    if (!map.mapOptions.coordinates) {
      dispatch(setCurrentLocationCoordinates());
    }
    if (map.mapOptions.coordinates && !weather.status) {
      dispatch(setWeather(map.mapOptions.coordinates));
    }
    if (map.map) {
      dispatch(clearMap());
    }
  }, [dispatch, map.map, map.mapOptions.coordinates, weather.status]);

  if (weather.status === "SUCCESS" && weather.current && weather.city) {
    return (
      <>
        <div
          className={`${styles["weather-page-wrapper"]} ${
            bgStyles[sortImageCategory(weather.current.WeatherIcon)]
          }`}
        >
          <div className={styles["close-icon"]}>
            <Link href="/">
              <Image src={CloseIcon} height={22} alt="close icon" />
            </Link>
          </div>
          <ul className={styles["weather-category-list"]}>
            <li
              className={
                weatherType === "today" ? styles["selected"] : undefined
              }
              onClick={() => setWeatherType("today")}
            >
              today
            </li>
            <li
              className={
                weatherType === "hourly" ? styles["selected"] : undefined
              }
              onClick={() => setWeatherType("hourly")}
            >
              hourly
            </li>
            <li
              className={
                weatherType === "daily" ? styles["selected"] : undefined
              }
              onClick={() => setWeatherType("daily")}
            >
              5 days
            </li>
          </ul>
          <h1 className={styles["city-name"]}>
            {sortCityNameToShow(weather.city)}
          </h1>
          <div className={styles["weather-container"]}>
            <Today weatherType={weatherType} />
            <Hourly weatherType={weatherType} />
            <Daily weatherType={weatherType} />
          </div>
        </div>
      </>
    );
  }

  if (weather.status === "REJECTED") {
    return <Error />;
  }

  return <Spinner />;
};

export default Weather;
