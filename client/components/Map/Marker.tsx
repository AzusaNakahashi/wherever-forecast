import { useEffect, useState } from "react";
import { useAppSelector } from "../../features/hooks";

const Marker: React.FC<google.maps.MarkerOptions> = (map) => {
  const [marker, setMarker] = useState<google.maps.Marker>();
  const mapRedux = useAppSelector((state) => state.map);

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }
    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker, map]);

  useEffect(() => {
    const coordinates = mapRedux.mapOptions.coordinates;
    if (marker && coordinates) {
      marker.setOptions({ map: map.map, position: coordinates });
    }
  });

  return null;
};

export default Marker;
