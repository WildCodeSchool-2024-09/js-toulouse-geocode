import { useStationsLocationsContext } from "../contexts/StationsLocationsContextProvider";

interface StationTitleProps {
  setStationCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

function StationTitle({ setStationCollapsed }: StationTitleProps) {
  const handleClick = () => {
    setStationCollapsed((prev) => !prev);
  };

  const handleKeyDown = () => {};

  const stationsLocationsContext = useStationsLocationsContext();

  return (
    <div className="station-title">
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
