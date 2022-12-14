const fetchCurrentLocation = () => {
  if (!navigator.geolocation) {
    return Error("navigator.geolocation is not available");
  }
  return new Promise((success) => {
    navigator.geolocation.getCurrentPosition(
      success,
      (error) => {
        throw error;
      },
      {
        maximumAge: 60000,
        timeout: 30000,
        enableHighAccuracy: false,
      }
    );
  });
};

const fetchGoogleMap = (ref: HTMLDivElement): google.maps.Map => {
  return new window.google.maps.Map(ref, {
    center: { lat: 49.2827, lng: -123.1207 },
    zoom: 13,
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    zoomControl: true,
  });
};

export { fetchCurrentLocation, fetchGoogleMap };
