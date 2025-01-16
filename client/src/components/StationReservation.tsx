function StationReservation() {
  return (
    <>
      <section className="station-vehicule">
        <select name="vehicule" id="vehicule">
          <option value="">Sélectionnez votre véhicule...</option>
          <option value="vehicule1">Véhicule 1</option>
          <option value="vehicule2">Véhicule 2</option>
          <option value="vehicule3">Véhicule 3</option>
        </select>
        <div className="time-info">
          <label htmlFor="reservation-date">
            Date et heure de réservation:
          </label>
          <input type="datetime-local" name="reservation-date" />
        </div>
      </section>
    </>
  );
}

export default StationReservation;
