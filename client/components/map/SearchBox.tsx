import { useEffect, useState } from "react";
import {
  setCenterCoordinates,
  setMarkerCoordinates,
  setZoom,
} from "../../features/map";
import styles from "../../styles/home/home.module.scss";
import { useAppDispatch, useAppSelector } from "../../features/hooks";

interface Input {
  element: HTMLInputElement;
  instance: google.maps.places.SearchBox;
}

const SearchBox = () => {
  const [searchBox, setSearchBox] = useState<Input | null>();
  const map = useAppSelector((state) => state.map);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!searchBox && map.map) {
      const input = document.getElementById("searchText") as HTMLInputElement;
      const instance = new google.maps.places.SearchBox(input);
      setSearchBox({ element: input, instance: instance });
      map.map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
    }

    if (searchBox && map.map) {
      searchBox.instance.addListener("places_changed", () => {
        const places = searchBox.instance.getPlaces();
        if (places?.length) {
          const coordinates = {
            lat: places[0].geometry?.location?.lat(),
            lng: places[0].geometry?.location?.lng(),
          };
          dispatch(setMarkerCoordinates(coordinates));
          dispatch(setCenterCoordinates(coordinates));
          dispatch(setZoom(13));
          searchBox.element.value = "";
        }
      });
    }
  }, [map, dispatch, searchBox]);
  return (
    <input
      type="text"
      id="searchText"
      className={styles["search-box"]}
      name="searchText"
      placeholder="city, area name"
    />
  );
};

export default SearchBox;
