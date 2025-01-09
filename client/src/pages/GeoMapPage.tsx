import sha256 from "crypto-js/sha256";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "../styles/GeoMap.css";
import { useState } from "react";
import { GeoLocationProps } from "../../../server/common/types/StationProps";
import DisplayStation from "../components/DisplayStation";
import QueryCity from "../components/QueryCity";
import StationMarker from "../components/StationMarker";
import { useGeoPositionContext } from "../contexts/GeoPositionContextProvider";
import { useStationsLocationsContext } from "../contexts/StationsLocationsContextProvider";

interface ChangeViewProps {
  lat: number;
  lng: number;
  zoom: number;
}

function GeoMapPage() {
  const [stationCollapsed, setStationCollapsed] = useState(true);

  const geoPositionContext = useGeoPositionContext();
  const stationsLocationsContext = useStationsLocationsContext();

  const ChangeView = ({ lat, lng, zoom }: ChangeViewProps) => {
    const map = useMap();
    map.setView({ lat: lat, lng: lng }, zoom);
    const northWestBoundary = map.getBounds().getNorthWest();
    const southEastBoundary = map.getBounds().getSouthEast();
    stationsLocationsContext.setNorthWestBoundary(
      new GeoLocationProps(northWestBoundary.lat, northWestBoundary.lng),
    );
    stationsLocationsContext.setSouthEastBoundary(
      new GeoLocationProps(southEastBoundary.lat, southEastBoundary.lng),
    );
    return null;
  };

  return (
    <>
      <MapContainer
        center={[
          geoPositionContext.position.Latitude,
          geoPositionContext.position.Longitude,
        ]}
        zoom={geoPositionContext.zoomLevel}
        scrollWheelZoom={true}
      >
        <ChangeView
          lat={geoPositionContext.position.Latitude}
          lng={geoPositionContext.position.Longitude}
          zoom={geoPositionContext.zoomLevel}
        />
        <TileLayer
          attribution='&copy; <a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>'
          url="https://data.geopf.fr/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE=normal&TILEMATRIXSET=PM&FORMAT=image/png&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}"
        />
        <Marker
          position={[
            geoPositionContext.position.Latitude,
            geoPositionContext.position.Longitude,
          ]}
        >
          <Popup>
            {`Latitude: ${geoPositionContext.position.Latitude}, Longitude: ${geoPositionContext.position.Longitude}`}
          </Popup>
        </Marker>
        {stationsLocationsContext.stationlocations.map((station) => (
          <StationMarker
            key={sha256(
              `${station.name}|${station.address}|${station.geo_coords.latitude.toFixed(6)}-${station.geo_coords.longitude.toFixed(6)}`,
            )
              .words.map((x) => x.toString(16).padStart(2, "0"))
              .join("")}
            position={[
              station.geo_coords.latitude,
              station.geo_coords.longitude,
            ]}
          >
            <Popup>{station.name}</Popup>
          </StationMarker>
        ))}
      </MapContainer>
      <QueryCity />
      <DisplayStation
        stationCollapsed={stationCollapsed}
        setStationCollapsed={setStationCollapsed}
      />
    </>
  );
}

export default GeoMapPage;
