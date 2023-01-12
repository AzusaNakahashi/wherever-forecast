import { useEffect, useState } from "react";
import { useAppSelector } from "../../features/hooks";
import styles from "../../styles/pageState/spinner.module.scss";

const Spinner = () => {
  const map = useAppSelector((state) => state.map);
  const weather = useAppSelector((state) => state.weather);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (map.loadingStatus.map === "PENDING") {
      setMessage("Loading Map...");
    } else if (map.loadingStatus.currentLocationCoordinates === "PENDING") {
      setMessage("Loading Geolocation...");
    } else if (weather.status === "PENDING") {
      setMessage("Loading Weather Information...");
    }
  }, [
    map.loadingStatus.map,
    map.loadingStatus.currentLocationCoordinates,
    weather.status,
  ]);
  return (
    <div className={styles["spinner-container"]}>
      <div className={styles["spinner-icon"]}></div>
      <p className={styles["text"]}>{message}</p>
    </div>
  );
};

export default Spinner;
