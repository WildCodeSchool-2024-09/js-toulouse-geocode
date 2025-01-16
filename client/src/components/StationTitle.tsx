import { useStationsLocationsContext } from "../contexts/StationsLocationsContextProvider";

interface StationTitleProps {
  stationCollapsed: boolean;
  setStationCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

function StationTitle({
  stationCollapsed,
  setStationCollapsed,
}: StationTitleProps) {
  const handleClick = () => {
    setStationCollapsed((prev) => !prev);
  };

  const handleKeyDown = () => {};

  const stationsLocationsContext = useStationsLocationsContext();

  return (
    <div
      className={stationCollapsed ? "station-title collapsed" : "station-title"}
    >
      <h2>{stationsLocationsContext.station.name}</h2>
      <img
        src="/images/arrow-collapse.svg"
        alt="collapse"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default StationTitle;
