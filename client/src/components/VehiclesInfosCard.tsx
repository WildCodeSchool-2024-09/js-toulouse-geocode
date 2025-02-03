import { useState } from "react";
import "../styles/VehiclesInfosCard.css";
import deleteIconSVG from "/images/delete.svg";
import DeleteUserVehicle from "./DeleteUserVehicle";

interface VehiclesInfosCardProps {
  vehicleBrand: string;
  vehicleModel: string;
  chargingVehicleType: string;
}

export default function VehiclesInfosCard({
  vehicleBrand,
  vehicleModel,
  chargingVehicleType,
}: VehiclesInfosCardProps) {
  const [isDeletingVehicle, setIsDeletingVehicle] = useState<boolean>(false);

  return (
    <article className="vehicles-infos-card-container">
      <div className="brand-and-model-car">
        <div className="brand-car">
          <h2>Marque:</h2>
          <p>{vehicleBrand}</p>
        </div>
        <div className="model-car">
          <h2>Modèle:</h2>
          <p>{vehicleModel}</p>
        </div>
      </div>
      <div className="charging-vehicle-type">
        <h2>Type de charge</h2>
        <p>{chargingVehicleType}</p>
      </div>
      <button
        type="button"
        className="delete-user-vehicle-button"
        onClick={() => setIsDeletingVehicle(true)}
      >
        <img src={deleteIconSVG} alt="" />
      </button>
      {isDeletingVehicle && (
        <DeleteUserVehicle setIsDeletingVehicle={setIsDeletingVehicle} />
      )}
    </article>
  );
}
