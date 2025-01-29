import VehiclesInfosCard from "./VehiclesInfosCard";
import "../styles/VehiclesInfosList.css";
import { useState } from "react";
import AddUserVehicle from "./AddUserVehicle";

export default function VehiclesInfo() {
  const vehiclesInfos = [
    {
      id: 1,
      vehicleBrand: "Audi",
      vehicleModel: "RS3",
      chargingVehicleType: "T2",
    },
    {
      id: 2,
      vehicleBrand: "Tesla",
      vehicleModel: "Model 3",
      chargingVehicleType: "T2",
    },
    {
      id: 3,
      vehicleBrand: "Renault",
      vehicleModel: "Zoe",
      chargingVehicleType: "T2",
    },
    {
      id: 4,
      vehicleBrand: "Peugeot",
      vehicleModel: "208",
      chargingVehicleType: "T2",
    },
  ];

  const [isAddingVehicle, setIsAddingVehicle] = useState(false);

  return (
    <>
      <section className="vehicles-info-container">
        <article className="vehicles-infos-header">
          <h1>Mes véhicules</h1>
          <button
            type="button"
            className="add-vehicle-button"
            onClick={() => setIsAddingVehicle(true)}
          >
            + Ajouter un véhicule
          </button>
        </article>
        <article className="grid-car-infos-cards">
          {vehiclesInfos.map((item) => (
            <VehiclesInfosCard
              key={item.id}
              vehicleBrand={item.vehicleBrand}
              vehicleModel={item.vehicleModel}
              chargingVehicleType={item.chargingVehicleType}
            />
          ))}
        </article>
      </section>
      {isAddingVehicle && <AddUserVehicle />}
    </>
  );
}
