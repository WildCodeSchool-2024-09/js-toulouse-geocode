import closeCrossSvg from "/images/close.svg";

export default function AddUserVehicle() {
  return (
    <section
      className="modal-user-vehicle-add"
      style={{ position: "absolute" }}
    >
      <div className="add-vehicle-header">
        <h2>Ajouter un véhicule</h2>
        <img src={closeCrossSvg} alt="" />
      </div>
      <form action="">
        <label htmlFor="vehicle-brand">Marque</label>
        <input type="text" id="vehicle-brand" name="vehicle-brand" required />
        <label htmlFor="vehicle-model">Modèle</label>
        <input type="text" id="vehicle-model" name="vehicle-model" required />
        <label htmlFor="vehicle-type">Type de recharge</label>
        <input type="text" id="vehicle-type" name="vehicle-type" required />
        <button type="submit">Ajouter</button>
      </form>
    </section>
  );
}
