import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useStationsLocationsContext } from "../contexts/StationsLocationsContextProvider";

interface OutletProps {
  id: number;
  type: string;
  power_max: number;
  name: string;
}
interface VehicleProps {
  id: number;
  brand: string;
  model: string;
  type: string;
  user_id: number;
}

function StationReservation() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [pdcs, setPdcs] = useState<OutletProps[]>(Array<OutletProps>());
  const [vehicles, setVehicles] = useState<VehicleProps[]>(
    Array<VehicleProps>(),
  );

  const stationsLocationsContext = useStationsLocationsContext();
  const authContext = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event?.currentTarget;
    event.preventDefault();
    const formData = new FormData(form);
    if (!formData.get("pdc_id")) {
      setErrorMessage("Veuillez sélectionner une prise.");
      return;
    }
    if (!formData.get("vehicule_id")) {
      setErrorMessage("Veuillez sélectionner un véhicule.");
      return;
    }
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    if (response.ok) {
      form.reset();
      setMessage("Votre réservation a bien été effectuée.");
      setErrorMessage("");
      setTimeout(() => {
        stationsLocationsContext.setIsReservationComponentDisplayed(false);
      }, 2500);
    } else {
      setErrorMessage("Une erreur est survenue, veuillez réessayer plus tard");
    }
  };

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/stations/outlet/${stationsLocationsContext.station.id}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setPdcs(data as OutletProps[]);
      });
    fetch(
      `${import.meta.env.VITE_API_URL}/api/vehicles/user/${authContext.auth?.user_id}`,
      {
        method: "GET",
        credentials: "include",
      },
    )
      .then((response) => response.json())
      .then((data) => {
        setVehicles(data as VehicleProps[]);
      });
  }, [stationsLocationsContext.station.id, authContext.auth?.user_id]);

  return (
    <>
      <form
        action={`${import.meta.env.VITE_API_URL}/api/bookings`}
        method="post"
        onSubmit={handleSubmit}
        className="station-reservation-form"
      >
        <select name="pdc_id" id="pdc">
          <option value="">Sélectionnez votre prise...</option>
          {pdcs.map((pdc: OutletProps) => (
            <option key={nanoid()} value={pdc.id}>
              {`Prise (${pdc.name}) - Type: ${pdc.type} - Puissance: ${pdc.power_max} kW`}
            </option>
          ))}
        </select>
        <select name="vehicule_id" id="vehicule">
          <option value="">Sélectionnez votre véhicule...</option>
          {vehicles.map((vehicle: VehicleProps) => (
            <option key={nanoid()} value={vehicle.id}>
              {`${vehicle.brand} ${vehicle.model} - Type: ${vehicle.type}`}
            </option>
          ))}
        </select>
        <label htmlFor="reservation-date">Date et heure de réservation:</label>
        <input type="datetime-local" name="reservation_date" />
        {errorMessage && <p className="error">{errorMessage}</p>}
        {message && <p>{message}</p>}
        <section className="station-reservation-validate">
          <button type="submit">Valider la réservation</button>
        </section>
      </form>
    </>
  );
}

export default StationReservation;
