import { useStationsLocationsContext } from "../contexts/StationsLocationsContextProvider";
import StationDescription from "./StationDescription";
import StationReservation from "./StationReservation";

interface StationMainProps {
  stationCollapsed: boolean;
}

function StationMain({ stationCollapsed }: StationMainProps) {
  const stationsLocationsContext = useStationsLocationsContext();

  const containsFiveDigits = (str: string) => {
    const regex = /\d{5}/;
    return regex.test(str);
  };

  return (
    <div
      className={stationCollapsed ? "station-main collapsed" : "station-main"}
    >
      <article className="station-info">
        <section className="station-sign">
          {stationsLocationsContext.station.sign_name}
        </section>
        <section className="station-operator">
          {stationsLocationsContext.station.operator_name}
        </section>
        <section className="station-address">
          <img src="/images/address.svg" alt="address" />
          <p>
            {containsFiveDigits(stationsLocationsContext.station.address)
              ? stationsLocationsContext.station.address
              : `${stationsLocationsContext.station.address}, ${stationsLocationsContext.station.area.postalcode} ${stationsLocationsContext.station.area.city_name}`}
          </p>
        </section>
        <section className="station-reservation-description">
          {stationsLocationsContext.isReservationComponentDisplayed ? (
            <StationReservation />
          ) : (
            <StationDescription />
          )}
        </section>
      </article>
    </div>
  );
}

export default StationMain;
