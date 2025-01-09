interface StationTitleProps {
  setStationCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

function StationTitle({ setStationCollapsed }: StationTitleProps) {
  const handleClick = () => {
    setStationCollapsed((prev) => !prev);
  };

  const handleKeyDown = () => {};

  return (
    <div className="station-title">
      <h2>{}</h2>
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
