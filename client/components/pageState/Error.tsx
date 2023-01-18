import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import styles from "../../styles/pageState/error.module.scss";
import { useAppSelector } from "../../features/hooks";
import Link from "next/link";

const Error = () => {
  const map = useAppSelector((state) => state.map);
  const weather = useAppSelector((state) => state.weather);
  const [messages, setMessages] = useState<string[]>([]);

  function refreshPage() {
    window.location.reload();
  }

  useEffect(() => {
    if (map.loadingStatus.map === "REJECTED") {
      setMessages(["We could not load map.", "Please try again later."]);
    } else if (map.loadingStatus.currentLocationCoordinates === "REJECTED") {
      setMessages([
        "We couldn't fetch your location. Make sure your geolocation is turned on.",
      ]);
    } else if (
      weather.status === "REJECTED" &&
      map.loadingStatus.currentLocationCoordinates === "SUCCESS"
    ) {
      setMessages([
        "We could not fetch weather information.",
        "Please make sure to choose a valid location",
      ]);
    }
  }, [
    map.loadingStatus.map,
    map.loadingStatus.currentLocationCoordinates,
    weather.status,
  ]);
  return (
    <div className={styles["error-container"]}>
      <div className={styles["content-wrapper"]}>
        <p>Oops! Sorry!</p>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}

        <button onClick={refreshPage}>Reload</button>
      </div>
    </div>
  );
};

export default Error;
