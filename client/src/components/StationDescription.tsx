import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useStationsLocationsContext } from "../contexts/StationsLocationsContextProvider";

interface OutletPros {
  power_max: number;
  type: string;
}

function StationDescription() {
  const stationsLocationsContext = useStationsLocationsContext();
  const authContext = useAuth();
  const navigate = useNavigate();
  const [pdcType, setPdcType] = useState("");
  const [maxPower, setMaxPower] = useState(0);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/stations/outlet/${stationsLocationsContext.station.id}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setPdcType(
          data
            .map((outlet: OutletPros) => outlet.type)
            .filter(
              (value: OutletPros, index: number, self: OutletPros[]) =>
                self.indexOf(value) === index,
            )
            .join(", "),
        );
        setMaxPower(
          Math.max(...data.map((outlet: OutletPros) => outlet.power_max)),
        );
      });
  }, [stationsLocationsContext.station.id]);

  return (
    <>
      <section className="station-pdc">
        <span>{`Type: ${pdcType} `}</span>
        <span className="fire-brush">{`max ${maxPower} kW`}</span>
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
