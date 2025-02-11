import { useState } from "react";
import "../styles/VehiclesInfosCard.css";
import deleteIconSVG from "/images/delete.svg";
import DeleteUserVehicle from "./DeleteUserVehicle";

interface VehiclesInfosCardProps {
  vehicleId: number;
  vehicleBrand: string;
  vehicleModel: string;
  chargingVehicleType: string;
}

export default function VehiclesInfosCard({
  vehicleId,
  vehicleBrand,
  vehicleModel,
  chargingVehicleType,
}: VehiclesInfosCardProps) {
  const [isDeletingVehicle, setIsDeletingVehicle] = useState<boolean>(false);

  return (
    <article className="vehicles-infos-card-container">
      <div className="vehicles-infos-card-container">
        <div className="brand-car">
          <span>Marque: </span>
          <span>{vehicleBrand}</span>
        </div>
        <div className="model-car">
          <span>Modèle:</span>
          <span>{vehicleModel}</span>
        </div>
        <div className="charging-vehicle-type">
          <span>Type de charge: </span>
          <span>{chargingVehicleType}</span>
        </div>
      </div>
      <button
        type="button"
        className="delete-user-vehicle-button"
        onClick={() => setIsDeletingVehicle(true)}
      >
        <img src={deleteIconSVG} alt="" />
      </button>
      {isDeletingVehicle && (
        <DeleteUserVehicle
          vehicleId={vehicleId}
          setIsDeletingVehicle={setIsDeletingVehicle}
        />
      )}
    </article>
  );
}
