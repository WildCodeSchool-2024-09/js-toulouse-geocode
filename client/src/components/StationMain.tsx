import { useStationsLocationsContext } from "../contexts/StationsLocationsContextProvider";

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
          <img src="/images/address.svg" alt="adress" />
          <p>
            {containsFiveDigits(stationsLocationsContext.station.address)
              ? stationsLocationsContext.station.address
              : `${stationsLocationsContext.station.address}, ${stationsLocationsContext.station.area.postalcode} ${stationsLocationsContext.station.area.city_name}`}
          </p>
        </section>
        <section className="station-pdc">
          <span>{`Type: ${stationsLocationsContext.station.pdc.type} `}</span>
          <span className="fire-brush">{`max ${stationsLocationsContext.station.pdc.power_max.toFixed(1)} kW`}</span>
        </section>
        <section className="station-dispo">
          {`${stationsLocationsContext.station.number_pdc} place(s) disponible(s)`}
        </section>
        <section className="station-accessibility">
          <span>{"Horaires: "}</span>
          <span className="fire-brush">
            {stationsLocationsContext.station.accessibility}
          </span>
        </section>
        <section className="access-charging">
          {stationsLocationsContext.station.access_charging}
        </section>
        <section className="station-reserve">
          <button type="button" disabled>
            Réserver
          </button>
        </section>
      </article>
    </div>
  );
}

export default StationMain;
