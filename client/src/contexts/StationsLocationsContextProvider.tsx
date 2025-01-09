import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  GeoLocationProps,
  type StationPropsWithLocation,
} from "../../../server/common/types/StationProps";

interface StationLocationsContextProps {
  stationlocations: Array<StationPropsWithLocation>;
  setStationLocations: React.Dispatch<
    React.SetStateAction<Array<StationPropsWithLocation>>
  >;
  northWestBoundary: GeoLocationProps;
  setNorthWestBoundary: React.Dispatch<React.SetStateAction<GeoLocationProps>>;
  southEastBoundary: GeoLocationProps;
  setSouthEastBoundary: React.Dispatch<React.SetStateAction<GeoLocationProps>>;
}

type StationLocationsContextType = StationLocationsContextProps | null;
const StationsLocationsContext =
  createContext<StationLocationsContextType>(null);

type StationsLocationsContextProviderProps = {
  children: React.ReactNode;
};

export function StationsLocationsContextProvider({
  children,
}: StationsLocationsContextProviderProps) {
  const [stationLocations, setStationLocations] = useState(
    Array<StationPropsWithLocation>(0),
  );
  const [northWestBoundary, setNorthWestBoundary] = useState(
    new GeoLocationProps(),
  );
  const [southEastBoundary, setSouthEastBoundary] = useState(
    new GeoLocationProps(),
  );

  const memoStationLocations = useMemo(
    () => ({
      stationlocations: stationLocations,
      setStationLocations: setStationLocations,
      northWestBoundary: northWestBoundary,
      setNorthWestBoundary: setNorthWestBoundary,
      southEastBoundary: southEastBoundary,
      setSouthEastBoundary: setSouthEastBoundary,
    }),
    [stationLocations, northWestBoundary, southEastBoundary],
  );

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL}/api/stations/geolocation?northwestlatitude=${northWestBoundary.latitude}&northwestlongitude=${northWestBoundary.longitude}&southeastlatitude=${southEastBoundary.latitude}&southeastlongitude=${southEastBoundary.longitude}`;
    console.info(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setStationLocations(data as Array<StationPropsWithLocation>);
      });
  }, [northWestBoundary, southEastBoundary]);

  return (
    <StationsLocationsContext.Provider
      value={memoStationLocations as StationLocationsContextType}
    >
      {children}
    </StationsLocationsContext.Provider>
  );
}

export const useStationsLocationsContext = () => {
  const value = useContext(StationsLocationsContext);

  if (value == null) {
    throw new Error(
      "useStationsLocationsContext has to be used within <StationsLocationsContext.Provider>",
    );
  }

  return value;
};
