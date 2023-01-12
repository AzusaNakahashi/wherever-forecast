import React from "react";
import { useEffect, useRef } from "react";
import styles from "../../styles/home/home.module.scss";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import {
  setCoordinates,
  setCurrentLocationCoordinates,
  setGooglegMap,
  setZoom,
  watchMapAuth,
} from "../../features/map";
import { setWeather } from "../../features/weather";

interface MapProps extends google.maps.MapOptions {
  children?: React.ReactNode;
}

declare global {
  interface Window {
    gm_authFailure: () => void;
  }
}

const Map: React.FC<MapProps> = ({ children, ...options }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mapStyles = {
    width: "100%",
    height: "100vh",
  };
  const dispatch = useAppDispatch();
  const map = useAppSelector((state) => state.map);

  useEffect(() => {
    // get current location coordinates
    if (
      !map.mapOptions.coordinates &&
      map.loadingStatus.currentLocationCoordinates === null
    ) {
      dispatch(setCurrentLocationCoordinates());
    }
    // get Map
    if (ref.current && !map.map) {
      // without zoom cause error
      //dispatch(setGooglegMap(param));
      dispatch(setGooglegMap(ref.current));
    }
    // set values when map and coordinates are ready
    if (map.map && map.mapOptions.coordinates) {
      map.map.setCenter(map.mapOptions.coordinates);
      map.map.setZoom(map.mapOptions.zoom);
    }

    window.gm_authFailure = () => {
      dispatch(watchMapAuth());
    };
  }, [ref, map, dispatch, map.mapOptions.coordinates, map.mapOptions.zoom]);

  // event handlers
  useEffect(() => {
    const onClick = (e: google.maps.MapMouseEvent) => {
      // avoid directly mutating state
      if (e.latLng) {
        const coordinates = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        dispatch(setCoordinates(coordinates));
      }
    };
    const onIdle = (m: google.maps.Map) => {
      dispatch(setZoom(m.getZoom()!));
    };
    if (map.map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.map.addListener("click", onClick);
      }
      if (onIdle) {
        map.map.addListener("idle", () => onIdle(map.map as google.maps.Map));
      }
    }
  }, [map, dispatch]);

  useEffect(() => {
    if (map.mapOptions.coordinates) {
      dispatch(setWeather(map.mapOptions.coordinates));
    }
  }, [dispatch, map.mapOptions.coordinates]);

  return (
    <div ref={ref} style={mapStyles} className={styles["map"]}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          // @ts-ignore
          return React.cloneElement(child, map);
        }
      })}
    </div>
  );
};

export default Map;
