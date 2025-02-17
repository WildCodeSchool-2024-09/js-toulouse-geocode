import sha256 from "crypto-js/sha256";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "../styles/GeoMap.css";
import type { LatLngLiteral } from "leaflet";
import { useState } from "react";
import { GeoLocationProps } from "../../../server/common/types/StationProps";
import DisplayStation from "../components/DisplayStation";
import QueryCity from "../components/QueryCity";
import StationMarker from "../components/StationMarker";
import { useGeoPositionContext } from "../contexts/GeoPositionContextProvider";
import { useShowMenubar } from "../contexts/ShowMenubarProvider";
import { useStationsLocationsContext } from "../contexts/StationsLocationsContextProvider";

function GeoMapPage() {
  const [stationCollapsed, setStationCollapsed] = useState(true);

  const geoPositionContext = useGeoPositionContext();

  const stationsLocationsContext = useStationsLocationsContext();
  const [previousNorthWest, setPreviousNorthWest] =
    useState<GeoLocationProps | null>(null);
  const [previousSouthEast, setPreviousSouthEast] =
    useState<GeoLocationProps | null>(null);

  const [centerOnGeoLocation, setCenterOnGeoLocation] = useState(true);

  const ChangeView = (center: LatLngLiteral) => {
    const map = useMap();
    map.setView(center, geoPositionContext.zoomLevel);
    return null;
  };

  const showMenuBarContext = useShowMenubar();
  showMenuBarContext.setShowMenubar(true);

  const ObserveEvents = () => {
    const map = useMap();

    const initializeBoundaries = () => {
      if (previousNorthWest != null && previousSouthEast != null) {
        return;
      }

      const bounds = map.getBounds();
      const northWest = bounds.getNorthWest();
      const southEast = bounds.getSouthEast();
      const northWestBoundary = new GeoLocationProps(
        northWest.lat,
        northWest.lng,
      );
      const southEastBoundary = new GeoLocationProps(
        southEast.lat,
        southEast.lng,
      );
      setPreviousNorthWest(northWestBoundary);
      setPreviousSouthEast(southEastBoundary);
      stationsLocationsContext.setNorthWestBoundary(northWestBoundary);
      stationsLocationsContext.setSouthEastBoundary(southEastBoundary);
    };

    const detectViewChange = () => {
      if (previousNorthWest == null || previousSouthEast == null) {
        return;
      }

      setCenterOnGeoLocation(false);
      const bounds = map.getBounds();
      const northWest = bounds.getNorthWest();
      const southEast = bounds.getSouthEast();
      const northWestBoundary = new GeoLocationProps(
        northWest.lat,
        northWest.lng,
      );
      const southEastBoundary = new GeoLocationProps(
        southEast.lat,
        southEast.lng,
      );
      const deltaNorthWestLatitude = Math.abs(
        northWestBoundary.latitude - previousNorthWest.latitude,
      );
      const deltaNorthWestLongitude = Math.abs(
        northWestBoundary.longitude - previousNorthWest.longitude,
      );
      const deltaSouthEastLatitude = Math.abs(
        southEastBoundary.latitude - previousSouthEast.latitude,
      );
      const deltaSouthEastLongitude = Math.abs(
        southEastBoundary.longitude - previousSouthEast.longitude,
      );
      const deltaMapLatitude = Math.abs(
        northWestBoundary.latitude - previousSouthEast.latitude,
      );
      const deltaMapLongitude = Math.abs(
        northWestBoundary.longitude - previousSouthEast.longitude,
      );

      if (
        deltaNorthWestLatitude / deltaMapLatitude > 0.1 ||
        deltaNorthWestLongitude / deltaMapLongitude > 0.1 ||
        deltaSouthEastLatitude / deltaMapLatitude > 0.1 ||
        deltaSouthEastLongitude / deltaMapLongitude > 0.1
      ) {
        stationsLocationsContext.setNorthWestBoundary(
          new GeoLocationProps(northWest.lat, northWest.lng),
        );
        stationsLocationsContext.setSouthEastBoundary(
          new GeoLocationProps(southEast.lat, southEast.lng),
        );
        setPreviousNorthWest(northWestBoundary);
        setPreviousSouthEast(southEastBoundary);
      }
    };

    useMapEvents({
      move: () => {
        detectViewChange();
      },
      zoom: () => {
        detectViewChange();
      },
    });

    initializeBoundaries();
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
        {centerOnGeoLocation && (
          <ChangeView
            lat={geoPositionContext.position.Latitude}
            lng={geoPositionContext.position.Longitude}
          />
        )}
        <ObserveEvents />
        <TileLayer
          attribution="&copy; Esri"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
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
              `${station.name}|${station.address}|${station.geo_coords.latitude}-${station.geo_coords.longitude}|${station.id}`,
            )
              .words.map((x) => x.toString(16).padStart(2, "0"))
              .join("")}
            position={[
              station.geo_coords.latitude,
              station.geo_coords.longitude,
            ]}
            station={station}
          />
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
