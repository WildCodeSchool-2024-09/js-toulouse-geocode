import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useStationsLocationsContext } from "../contexts/StationsLocationsContextProvider";

function StationDescription() {
  const stationsLocationsContext = useStationsLocationsContext();
  const authContext = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <section className="station-pdc">
        <span>{`Type: ${"stationsLocationsContext.station.pdc.type"} `}</span>
        <span className="fire-brush">{`max ${"stationsLocationsContext.station.pdc.power_max.toFixed(1)"} kW`}</span>
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
        {authContext.auth ? (
          <button
            type="button"
            onClick={() =>
              stationsLocationsContext.setIsReservationComponentDisplayed(true)
            }
          >
            Réserver
          </button>
        ) : (
          <button type="button" onClick={() => navigate("/login")}>
            Se connecter
          </button>
        )}
      </section>
    </>
  );
}

export default StationDescription;
