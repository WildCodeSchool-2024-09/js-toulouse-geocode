import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "../styles/GeoMap.css";
import QueryCity from "../components/QueryCity";
import { useGeoPositionContext } from "../contexts/GeoPositionContextProvider";

interface ChangeViewProps {
  lat: number;
  lng: number;
  zoom: number;
}

function GeoMapPage() {
  const geoPositionContext = useGeoPositionContext();

  const ChangeView = ({ lat, lng, zoom }: ChangeViewProps) => {
    const map = useMap();
    map.setView({ lat: lat, lng: lng }, zoom);
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
      </MapContainer>
      <QueryCity />
    </>
  );
}

export default GeoMapPage;
