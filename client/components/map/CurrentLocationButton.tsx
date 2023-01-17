import { useEffect, useState } from "react";
import { setCurrentLocationCoordinates, setZoom } from "../../features/map";
import styles from "../../styles/home/home.module.scss";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import Image from "next/image";
import geolocationButton from "../../public/map-icons/currentLocation.svg";

const CurrentLocationButton = () => {
  const [button, setButton] = useState<HTMLButtonElement | null>();
  const map = useAppSelector((state) => state.map);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!button && map.map) {
      console.log("fired button");
      const getlocationButton = document.getElementById(
        "geolocationButton"
      ) as HTMLButtonElement;
      setButton(getlocationButton);
      map.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(
        getlocationButton
      );
    }
  }, [map, dispatch, button]);

  useEffect(() => {
    if (button && map.map) {
      button.addEventListener("click", () => {
        dispatch(setCurrentLocationCoordinates());
        dispatch(setZoom(13));
      });
    }
  }, [button, map.map, dispatch]);

  return (
    <button id="geolocationButton" className={styles["geolocation-button"]}>
      <Image
        src={geolocationButton}
        height={40}
        alt="geolocation fetch button"
      />
    </button>
  );
};

export default CurrentLocationButton;
