import VehiclesInfosCard from "./VehiclesInfosCard";
import "../styles/VehiclesInfosList.css";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import AddUserVehicle from "./AddUserVehicle";
interface VehiclesInfoProps {
  setRefreshNavbar: (value: boolean) => void;
}

interface VehicleInfo {
  id: number;
  brand: string;
  model: string;
  type: string;
}

export default function VehiclesInfo({ setRefreshNavbar }: VehiclesInfoProps) {
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [vehiclesInfos, setVehiclesInfos] = useState<VehicleInfo[]>([]);
  const { auth } = useAuth();

  const fetchVehicleInfos = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/vehicles/user/${auth?.user_id}`,
      );

      if (response.ok) {
        const data = await response.json();

        setVehiclesInfos(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [auth]);

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
              vehicleBrand={item.brand}
              vehicleModel={item.model}
              chargingVehicleType={item.type}
            />
          ))}
        </article>
      </section>
      {isAddingVehicle && (
        <AddUserVehicle
          setIsAddingVehicle={setIsAddingVehicle}
          setRefreshNavbar={setRefreshNavbar}
        />
      )}
    </>
  );
}
