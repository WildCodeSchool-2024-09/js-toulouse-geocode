import VehiclesInfosCard from "./VehiclesInfosCard";
import "../styles/VehiclesInfosList.css";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useRefresh } from "../contexts/RefreshProvider";
import AddUserVehicle from "./AddUserVehicle";

interface VehicleInfo {
  id: number;
  brand: string;
  model: string;
  type: string;
  user_id: number;
}

export default function VehiclesInfo() {
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [vehiclesInfos, setVehiclesInfos] = useState<VehicleInfo[]>([]);
  const { auth } = useAuth();
  const { refresh } = useRefresh();

  const fetchVehicleInfos = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/vehicles/user/${auth?.user_id}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (response.ok) {
        const data = await response.json();

        setVehiclesInfos(data);
      }
      refresh;
    } catch (error) {
      console.error(error);
    }
  }, [auth, refresh]);

  useEffect(() => {
    fetchVehicleInfos();
  }, [fetchVehicleInfos]);

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
              vehicleId={item.id}
              vehicleBrand={item.brand}
              vehicleModel={item.model}
              chargingVehicleType={item.type}
            />
          ))}
        </article>
      </section>
      {isAddingVehicle && (
        <AddUserVehicle setIsAddingVehicle={setIsAddingVehicle} />
      )}
    </>
  );
}
