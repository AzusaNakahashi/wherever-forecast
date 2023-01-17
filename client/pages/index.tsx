import React, { useEffect, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "../components/map/Map";
import styles from "../styles/home/home.module.scss";
import Marker from "../components/map/Marker";
import SearchBox from "../components/map/SearchBox";
import WeatherInfo from "../components/map/WeatherInfo";
import Spinner from "../components/pageState/Spinner";
import Error from "../components/pageState/Error";
import { useAppSelector } from "../features/hooks";
import CurrentLocationButton from "../components/map/CurrentLocationButton";

const MapWrapper = () => {
  const map = useAppSelector((state) => state.map);
  const weather = useAppSelector((state) => state.weather);
  const [loadingStatus, setLoadingStatus] = useState("PENDING");

  useEffect(() => {
    if (
      map.loadingStatus.currentLocationCoordinates === "SUCCESS" &&
      map.loadingStatus.map === "SUCCESS" &&
      weather.status === "SUCCESS"
    ) {
      setLoadingStatus("SUCCESS");
    } else if (
      map.loadingStatus.currentLocationCoordinates === "REJECTED" ||
      map.loadingStatus.map === "REJECTED" ||
      weather.status === "REJECTED"
    ) {
      setLoadingStatus("REJECTED");
    } else {
      setLoadingStatus("PENDING");
    }
  }, [
    map.loadingStatus.currentLocationCoordinates,
    map.loadingStatus.map,
    weather.status,
  ]);

  return (
    <div className={styles["map-container"]}>
      <Map>
        <Marker />
      </Map>
      <SearchBox />
      <CurrentLocationButton />
      <WeatherInfo />
      {loadingStatus === "PENDING" ? <Spinner /> : ""}
      {loadingStatus === "REJECTED" ? <Error /> : ""}
    </div>
  );
};

const Home = () => {
  const mapInitialRender = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return <Spinner />;
      case Status.FAILURE:
        return <Error />;
      case Status.SUCCESS:
        return <MapWrapper />;
    }
  };
  return (
    <>
      <Wrapper
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}
        render={mapInitialRender}
        libraries={["places"]}
      />
    </>
  );
};

export default Home;
