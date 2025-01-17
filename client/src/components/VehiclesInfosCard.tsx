import "../styles/VehiclesInfosCard.css";

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
  return (
    <article className="vehicles-infos-card-container">
      <div className="brand-and-model-car">
        <div className="brand-car">
          <h2>Marque :</h2>
          <p>{vehicleBrand}</p>
        </div>
        <div className="model-car">
          <h2>Modèle :</h2>
          <p>{vehicleModel}</p>
        </div>
      </div>
      <div className="charging-vehicle-type">
        <h2>Type de charge</h2>
        <p>{chargingVehicleType}</p>
      </div>
    </article>
  );
}
