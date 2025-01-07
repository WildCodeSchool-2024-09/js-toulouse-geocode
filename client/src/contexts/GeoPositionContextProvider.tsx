import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { PositionProps } from "../types/GeoCoords";

interface GeoPositionContextProps {
  position: PositionProps;
  setPosition: React.Dispatch<React.SetStateAction<PositionProps>>;
  displayQuery: boolean;
  setDisplayQuery: React.Dispatch<React.SetStateAction<boolean>>;
  zoomLevel: number;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
}

type GeoPositionContextType = GeoPositionContextProps | null;
const GeoPositionContext = createContext<GeoPositionContextType>(null);

type GeoPositionContextProviderProps = {
  children: React.ReactNode;
};

export function GeoPositionContextProvider({
  children,
}: GeoPositionContextProviderProps) {
  const positionOrigin = { Latitude: 46.7285, Longitude: 2.21 };

  const [position, setPosition] = useState<PositionProps>(positionOrigin);
  const [displayQuery, setDisplayQuery] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(16);

  const memoGeoPosition = useMemo(
    () => ({
      position,
      setPosition,
      displayQuery,
      setDisplayQuery,
      zoomLevel,
      setZoomLevel,
    }),
    [position, displayQuery, zoomLevel],
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        setPosition({
          Latitude: position.coords.latitude,
          Longitude: position.coords.longitude,
        });
        setDisplayQuery(false);
        setZoomLevel(16);
      },
      (_positionError: GeolocationPositionError) => {
        setDisplayQuery(true);
        setPosition(positionOrigin);
        setZoomLevel(6);
      },
    );
  }, []);

  return (
    <GeoPositionContext.Provider
      value={memoGeoPosition as GeoPositionContextType}
    >
      {children}
    </GeoPositionContext.Provider>
  );
}

export const useGeoPositionContext = () => {
  const value = useContext(GeoPositionContext);

  if (value == null) {
    throw new Error(
      "useGeoPositionContext has to be used within <GeoPositionProvider>",
    );
  }

  return value;
};
