import { useEffect, useState } from "react";
import { setCurrentLocationCoordinates, clearMap } from "../../features/map";
import { setWeather } from "../../features/weather";
import styles from "../../styles/weather/wrapper.module.scss";
import bgStyles from "../../styles/weather/background.module.scss";
import Today from "./Today";
import Hourly from "./Hourly";
import Daily from "./Daily";
import sortCityNameToShow from "../../service/sortCityNameToShow";
import Link from "next/link";
import Image from "next/image";
import CloseIcon from "../../public/page-icons/close-icon.svg";
import Spinner from "../pageState/Spinner";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import sortImageCategory from "../../service/sortImageCategory";

const Weather = () => {
  const dispatch = useAppDispatch();
  const weather = useAppSelector((state) => state.weather);
  const map = useAppSelector((state) => state.map);
  const [category, setCategory] = useState("today");

  useEffect(() => {
    if (!map.mapOptions.coordinates) {
      dispatch(setCurrentLocationCoordinates());
    }
    if (map.mapOptions.coordinates && !weather.status) {
      dispatch(setWeather(map.mapOptions.coordinates));
    }
    // when !map.map on index.js, load google map again
    // without this, error occur
    if (map.map) {
      dispatch(clearMap());
    }
  }, [dispatch, map.map, map.mapOptions.coordinates, weather.status]);

  if (weather.status === "SUCCESS") {
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
              className={category === "today" ? styles["selected"] : undefined}
              onClick={() => setCategory("today")}
            >
              today
            </li>
            <li
              className={category === "hourly" ? styles["selected"] : undefined}
              onClick={() => setCategory("hourly")}
            >
              hourly
            </li>
            <li
              className={category === "daily" ? styles["selected"] : undefined}
              onClick={() => setCategory("daily")}
            >
              5 days
            </li>
          </ul>
          <h1 className={styles["city-name"]}>
            {sortCityNameToShow(weather.city)}
          </h1>
          <div className={styles["weather-container"]}>
            <Today weatherType={category} />
            <Hourly weatherType={category} />
            <Daily weatherType={category} />
          </div>
        </div>
      </>
    );
  }
  return <Spinner />;
};

export default Weather;
