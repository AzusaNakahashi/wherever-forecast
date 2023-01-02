import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import Map from "../components/map/Map";
import styles from "../styles/home/home.module.scss";
import Marker from "../components/map/Marker";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import map, { setCoordinates, setZoom } from "../features/map";
import SearchBox from "../components/map/SearchBox";
import WeatherInfo from "../components/map/WeatherInfo";

const Home = () => {
  const mapInitialRender = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return <p>...loading</p>;
      case Status.FAILURE:
        return <p>Error</p>;
      case Status.SUCCESS:
        return (
          <div className={styles["map-container"]}>
            <Map>
              {/*clicks.map((latLng, i) => (
                <Marker key={i} position={latLng} />
              ))*/}
              <Marker />
            </Map>
            <SearchBox />
            <WeatherInfo />
          </div>
        );
    }
  };
  return (
    <>
      <Wrapper
        apiKey={"AIzaSyBXdv-Ybg9fCfMLswo150ltskkng12Sods"}
        render={mapInitialRender}
        libraries={["places"]}
      />
    </>
  );
};

export default Home;
