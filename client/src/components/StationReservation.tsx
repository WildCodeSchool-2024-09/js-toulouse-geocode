import { useState } from "react";

function StationReservation() {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event?.currentTarget;
    event.preventDefault();
    event.preventDefault();
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      form.reset();
      setErrorMessage("Votre réservation a bien été effectuée.");
    } else {
      setErrorMessage("Une erreur est survenue, veuillez réessayer plus tard");
    }
  };
  return (
    <>
      <form
        action={`${import.meta.env.VITE_API_URL}/api/reservations`}
        method="post"
        onSubmit={handleSubmit}
        className="station-reservation-form"
      >
        <select name="vehicule" id="vehicule">
          <option value="">Sélectionnez votre véhicule...</option>
          <option value="vehicule1">Véhicule 1</option>
          <option value="vehicule2">Véhicule 2</option>
          <option value="vehicule3">Véhicule 3</option>
        </select>
        <label htmlFor="reservation-date">Date et heure de réservation:</label>
        <input type="datetime-local" name="reservation-date" />
        {errorMessage && <p>{errorMessage}</p>}
        <section className="station-reservation-validate">
          <button type="submit" onClick={() => {}}>
            Valider la réservation
          </button>
        </section>
      </form>
    </>
  );
}

export default StationReservation;
