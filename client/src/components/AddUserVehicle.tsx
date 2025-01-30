import closeCrossSvg from "/images/close.svg";
import "../styles/AddUserVehicle.css";

interface AddUserVehicleProps {
  setIsAddingVehicle: (value: boolean) => void;
}

export default function AddUserVehicle({
  setIsAddingVehicle,
}: AddUserVehicleProps) {
  return (
    <div className="background-modal-user-vehicle-add">
      <section
        className="modal-user-vehicle-add"
        style={{ position: "absolute" }}
      >
        <div className="add-vehicle-header">
          <h2>Ajouter un véhicule</h2>
          <button
            type="button"
            className="add-user-vehicle-button"
            onClick={() => setIsAddingVehicle(false)}
          >
            <img src={closeCrossSvg} alt="close button" />
          </button>
        </div>
        <form action="" className="add-user-vehicle-form">
          <label htmlFor="vehicle-brand">Marque</label>
          <input
            type="text"
            id="vehicle-brand"
            name="vehicle-brand"
            placeholder="Marque"
            required
          />
          <label htmlFor="vehicle-model">Modèle</label>
          <input
            type="text"
            id="vehicle-model"
            name="vehicle-model"
            placeholder="Modèle"
            required
          />
          <label htmlFor="vehicle-type">Type de recharge</label>
          <input
            type="text"
            id="vehicle-type"
            name="vehicle-type"
            placeholder="Type de recharge"
            required
          />
          <button className="add-user-vehicule-button" type="submit">
            Ajouter
          </button>
        </form>
      </section>
    </div>
  );
}
