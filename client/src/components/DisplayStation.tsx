import StationMain from "./StationMain";
import StationTitle from "./StationTitle";
import "../styles/DisplayStation.css";

interface DisplayStationProps {
  stationCollapsed: boolean;
  setStationCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

function DisplayStation({
  stationCollapsed,
  setStationCollapsed,
}: DisplayStationProps) {
  return (
    <div className="display-station-container">
      <div
        className={
          stationCollapsed ? "display-station collapsed" : "display-station"
        }
      >
        <StationTitle setStationCollapsed={setStationCollapsed} />
        <StationMain stationCollapsed={stationCollapsed} />
      </div>
    </div>
  );
}

export default DisplayStation;
