import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { PositionProps } from "../types/GeoCoords";

const positionCenterOfFrance = { Latitude: 46.7285, Longitude: 2.21 };
const falsyPosition = { Latitude: -1, Longitude: -1 };

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
  const [position, setPosition] = useState<PositionProps>({
    Latitude: -1,
    Longitude: -1,
  });

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
    const sessionPosition = window.sessionStorage.getItem("position");

    const positionOrigin =
      sessionPosition != null
        ? (JSON.parse(sessionPosition) as PositionProps)
        : falsyPosition;

    if (
      positionOrigin.Latitude === falsyPosition.Latitude &&
      positionOrigin.Longitude === falsyPosition.Longitude
    ) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setPosition({
            Latitude: position.coords.latitude,
            Longitude: position.coords.longitude,
          });

          window.sessionStorage.setItem(
            "position",
            JSON.stringify({
              Latitude: position.coords.latitude,
              Longitude: position.coords.longitude,
            }),
          );

          setDisplayQuery(false);
          setZoomLevel(16);
        },
        (_positionError: GeolocationPositionError) => {
          setPosition(positionCenterOfFrance);
          window.sessionStorage.setItem(
            "position",
            JSON.stringify(positionCenterOfFrance),
          );

          setDisplayQuery(true);
          setZoomLevel(6);
        },
      );
    } else {
      setPosition(positionOrigin);
      if (
        positionOrigin.Latitude === positionCenterOfFrance.Latitude &&
        positionOrigin.Longitude === positionCenterOfFrance.Longitude
      ) {
        setDisplayQuery(true);
        setZoomLevel(6);
      } else {
        setDisplayQuery(false);
        setZoomLevel(16);
      }
    }
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
