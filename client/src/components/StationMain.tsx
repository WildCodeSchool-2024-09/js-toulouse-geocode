interface StationMainProps {
  stationCollapsed: boolean;
}

function StationMain({ stationCollapsed }: StationMainProps) {
  return (
    <div
      className={stationCollapsed ? "station-main collapsed" : "station-main"}
    >
      <div className="station-info" />
    </div>
  );
}

export default StationMain;
