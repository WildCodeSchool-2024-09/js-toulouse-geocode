import { Marker } from "react-leaflet";

import { Icon, type LatLngExpression } from "leaflet";

interface StationMarkerProps {
  children: React.ReactNode;
  position: LatLngExpression;
}

function StationMarker({ children, position }: StationMarkerProps) {
  const stationIcon = new Icon({
    iconUrl: "/images/marker.svg",
    iconSize: [32, 39],
  });
  return (
    <Marker position={position} icon={stationIcon}>
      {children}
    </Marker>
  );
}

export default StationMarker;
