export type Coordinates = {
  lat: number;
  lng: number;
};

export type Map = {
  map: google.maps.Map | null;
  mapOptions: {
    coordinates: {
      mapCenter: Coordinates | google.maps.LatLng | null;
      marker: Coordinates | null;
    };
    zoom: number;
    mapVerified: boolean | null;
  };
  loadingStatus: {
    currentLocationCoordinates: "SUCCESS" | "PENDING" | "REJECTED" | null;
    map: "SUCCESS" | "PENDING" | "REJECTED" | null;
  };
};
