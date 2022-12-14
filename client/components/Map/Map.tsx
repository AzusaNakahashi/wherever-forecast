import React, { useCallback } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "../../styles/home/home.module.scss";
import Marker from "./Marker";
import { createRoot } from "react-dom/client";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import {
  setCoordinates,
  setCurrentLocationCoordinates,
  setGooglegMap,
  setZoom,
  watchMapAuth,
} from "../../features/map";

interface MapProps extends google.maps.MapOptions {
  /*onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  onZoom?: (e: google.maps.MapMouseEvent) => void;*/
  children?: React.ReactNode;
}

const Map: React.FC<MapProps> = ({ children, ...options }) => {
  const ref = useRef<HTMLDivElement>(null);
  //const [map, setMap] = useState<google.maps.Map>();
  const mapStyles = {
    width: "100%",
    height: "100vh",
  };
  const dispatch = useAppDispatch();
  const map = useAppSelector((state) => state.map);
  //const [map, setMap] = React.useState<google.maps.Map>();

  console.log("map", map);

  /*
  const onClick = useCallback((e: google.maps.MapMouseEvent) => {
    // avoid directly mutating state
    setClicks([...clicks, e.latLng!]);
    console.log("clicks", clicks);
  }, [])*/

  window.gm_authFailure = () => {
    dispatch(watchMapAuth());
  };

  useEffect(() => {
    // get current location coordinates
    if (!map.mapOptions.coordinates) {
      dispatch(setCurrentLocationCoordinates());
    }
    // get Map
    if (ref.current && !map.map) {
      // without zoom cause error
      //dispatch(setGooglegMap(param));
      /*
      const googleMap = new window.google.maps.Map(ref.current, {
        center: { lat: 49.2827, lng: -123.1207 },
        zoom: 13,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: true,
      });*/
      dispatch(setGooglegMap(ref.current));
      //setMap(googleMap);
    }
    // set values when map and coordinates are ready
    if (map.map && map.mapOptions.coordinates) {
      map.map.setCenter(map.mapOptions.coordinates);
      map.map.setZoom(map.mapOptions.zoom);
    }
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
        map.map.addListener("idle", () => onIdle(map.map));
      }
    }
  }, [map, dispatch]);

  useDeepCompareEffectForMaps(() => {
    if (map.map) {
      map.map.setOptions(options);
    }
  }, [map, options]);

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

const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a: any, b: any) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    // TODO extend to other types

    // use fast-equals for other objects
    return deepEqual(a, b);
  }
);

function useDeepCompareMemoize(value: any) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: any[]
) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export {};
