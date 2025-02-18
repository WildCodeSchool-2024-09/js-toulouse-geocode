import { Marker } from "react-leaflet";

import { Icon, type LatLngExpression } from "leaflet";
import type { StationProps } from "../../../server/common/types/StationProps";
import { useStationsLocationsContext } from "../contexts/StationsLocationsContextProvider";

interface StationMarkerProps {
  position: LatLngExpression;
  station: StationProps;
  setStationCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

function StationMarker({
  position,
  station,
  setStationCollapsed,
}: StationMarkerProps) {
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
          setStationCollapsed(false);
          stationsLocationsContext.setIsReservationComponentDisplayed(false);
        },
      }}
    />
  );
}

export default StationMarker;
