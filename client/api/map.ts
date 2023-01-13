const fetchCurrentLocation = (): Promise<GeolocationPosition | Error> => {
  if (!navigator.geolocation) {
    throw Error("navigator.geolocation is not available");
  }
  const options = {
    maximumAge: 60000,
    timeout: 30000,
    enableHighAccuracy: false,
  };
  return new Promise<GeolocationPosition | Error>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve,
      ({ code, message }) =>
        reject(
          Object.assign(new Error(message), { name: "PositionError", code })
        ),
      options
    );
  });
};

const fetchGoogleMap = (ref: HTMLDivElement): google.maps.Map => {
  return new window.google.maps.Map(ref, {
    center: { lat: 49.888, lng: -119.496 },
    zoom: 13,
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    zoomControl: true,
  });
};

export { fetchCurrentLocation, fetchGoogleMap };
