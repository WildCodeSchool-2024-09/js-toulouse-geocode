import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  GeoLocationProps,
  StationProps,
} from "../../../server/common/types/StationProps";

interface StationLocationsContextProps {
  stationlocations: Array<StationProps>;
  setStationLocations: React.Dispatch<
    React.SetStateAction<Array<StationProps>>
  >;
  northWestBoundary: GeoLocationProps;
  setNorthWestBoundary: React.Dispatch<React.SetStateAction<GeoLocationProps>>;
  southEastBoundary: GeoLocationProps;
  setSouthEastBoundary: React.Dispatch<React.SetStateAction<GeoLocationProps>>;
  station: StationProps;
  setStation: React.Dispatch<React.SetStateAction<StationProps>>;
  isReservationComponentDisplayed: boolean;
  setIsReservationComponentDisplayed: React.Dispatch<
    React.SetStateAction<boolean>
  >;
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
    Array<StationProps>(0),
  );
  const [northWestBoundary, setNorthWestBoundary] = useState(
    new GeoLocationProps(),
  );
  const [southEastBoundary, setSouthEastBoundary] = useState(
    new GeoLocationProps(),
  );
  const [station, setStation] = useState(new StationProps());

  const [isReservationComponentDisplayed, setIsReservationComponentDisplayed] =
    useState(false);

  const memoStationLocations = useMemo(
    () => ({
      stationlocations: stationLocations,
      setStationLocations: setStationLocations,
      northWestBoundary: northWestBoundary,
      setNorthWestBoundary: setNorthWestBoundary,
      southEastBoundary: southEastBoundary,
      setSouthEastBoundary: setSouthEastBoundary,
      station: station,
      setStation: setStation,
      isReservationComponentDisplayed: isReservationComponentDisplayed,
      setIsReservationComponentDisplayed: setIsReservationComponentDisplayed,
    }),
    [
      stationLocations,
      northWestBoundary,
      southEastBoundary,
      station,
      isReservationComponentDisplayed,
    ],
  );

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL}/api/stations/geolocation?northwestlatitude=${northWestBoundary.latitude}&northwestlongitude=${northWestBoundary.longitude}&southeastlatitude=${southEastBoundary.latitude}&southeastlongitude=${southEastBoundary.longitude}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setStationLocations(data as Array<StationProps>);
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
