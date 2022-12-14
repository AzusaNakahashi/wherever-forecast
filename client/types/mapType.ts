export type Coordinates = {
  lat: number;
  lng: number;
};

export type Map = {
  map: google.maps.Map | null;
  mapOptions: {
    coordinates: Coordinates | null;
    zoom: number;
    mapVerified: boolean | null;
  };
  loadingStatus: {
    currentLocationCoordinates: string | null;
    map: string | null;
  };
};
