import { Marker } from "react-leaflet";

import { Icon, type LatLngExpression } from "leaflet";
import type { StationProps } from "../../../server/common/types/StationProps";
import { useStationsLocationsContext } from "../contexts/StationsLocationsContextProvider";

interface StationMarkerProps {
  position: LatLngExpression;
  station: StationProps;
}

function StationMarker({ position, station }: StationMarkerProps) {
  const stationIcon = new Icon({
    iconUrl: "/images/marker.svg",
    iconSize: [32, 39],
  });
  const stationsLocationsContext = useStationsLocationsContext();

  return (
    <Marker
      position={position}
      icon={stationIcon}
      eventHandlers={{
        click: () => {
          stationsLocationsContext.setStation(station);
        },
      }}
    />
  );
}

export default StationMarker;
