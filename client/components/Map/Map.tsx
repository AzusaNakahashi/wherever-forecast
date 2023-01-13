import React from "react";
import { useEffect, useRef } from "react";
import styles from "../../styles/home/home.module.scss";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import {
  setCenter,
  setCoordinates,
  setCurrentLocationCoordinates,
  setGooglegMap,
  setZoom,
  watchMapAuth,
} from "../../features/map";

interface MapProps extends google.maps.MapOptions {
  children?: React.ReactNode;
}

declare global {
  interface Window {
    gm_authFailure: () => void;
  }
}

const Map: React.FC<MapProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mapStyles = {
    width: "100%",
    height: "100vh",
  };
  const dispatch = useAppDispatch();
  const map = useAppSelector((state) => state.map);

  // initiate app with fetching current location coordinates and google map
  useEffect(() => {
    // fetch current location coordinates
    if (
      !map.mapOptions.coordinates.marker &&
      map.loadingStatus.currentLocationCoordinates === null
    ) {
      dispatch(setCurrentLocationCoordinates());
    }
    // fetch Map
    if (ref.current && !map.map) {
      // without zoom cause error
      dispatch(setGooglegMap(ref.current));
    }

    // detect google map error
    window.gm_authFailure = () => {
      dispatch(watchMapAuth());
    };
  }, [
    ref,
    map,
    dispatch,
    map.mapOptions.coordinates.marker,
    map.mapOptions.zoom,
  ]);

  // triggered by initial loading, onClick, searchBox
  // when marker coordinates changes, set the map center coordinates value the same in Redux
  // marker coordinates === center coordinates
  useEffect(() => {
    // for options center and zoom
    if (map.map && map.mapOptions.coordinates.marker) {
      // set only map center and zoom
      // marker is set in Marker.tsx separately
      console.log("first code");
      map.map.setCenter(map.mapOptions.coordinates.marker);
    }
  }, [map.map, map.mapOptions.coordinates.marker]);

  // triggered by useEffect above
  // when center changes, set center, zoom on the actual map
  // map.mapOptions.coordinates.marker => handled in Marker.tsx separately
  // map.mapOptions.coordinates.mapCenter and map.mapOptions.zoom will be set on this Map.tsx
  useEffect(() => {
    if (map.map && map.mapOptions.coordinates.mapCenter) {
      console.log(
        "map center change fired",
        map.mapOptions.zoom,
        map.mapOptions.coordinates.mapCenter
      );
      map.map.setCenter(map.mapOptions.coordinates.mapCenter);
      map.map.setZoom(map.mapOptions.zoom);
    }
  }, [map.map, map.mapOptions.coordinates.mapCenter, map.mapOptions.zoom]);

  // event handlers
  useEffect(() => {
    if (map.map) {
      const onClick = (e: google.maps.MapMouseEvent) => {
        // avoid directly mutating state
        if (e.latLng) {
          const coordinates = { lat: e.latLng.lat(), lng: e.latLng.lng() };
          dispatch(setCoordinates(coordinates));
        }
      };
      const onIdle = (m: google.maps.Map) => {
        console.log("idle working");
        dispatch(setZoom(m.getZoom()!));
        dispatch(setCenter(m.getCenter()!));
      };
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
