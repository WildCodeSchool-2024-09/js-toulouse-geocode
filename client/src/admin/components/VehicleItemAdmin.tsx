import { useCallback, useEffect, useState } from "react";
import arrowImg from "/images/arrow-item-img.svg";
import trashCanImg from "/images/trash-can-img.svg";
import type { VehicleItemType } from "../types/itemType";
import "../styles/VehicleItemAdmin.css";
import { useModal } from "../contexts/ShowModalProvider";

interface VehicleItemAdminProps {
  item: VehicleItemType;
}

export default function VehicleItemAdmin({ item }: VehicleItemAdminProps) {
  const [vehicle, setVehicle] = useState({
    model: item.model,
    brand: item.brand,
    type: item.type,
    owner: null as string | null,
  });
  const [isVisible, setIsVisible] = useState(false);
  const { setDisplayModification, setDisplayDeleteModal, setItemId } =
    useModal();

  const fetchData = useCallback(async () => {
    try {
      const [responseOwner, responseVehicle] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/api/users/${item.user_id}`, {
          method: "GET",
          credentials: "include",
        }),
        fetch(`${import.meta.env.VITE_API_URL}/api/vehicles/${item.id}`, {
          method: "GET",
          credentials: "include",
        }),
      ]);

      const [dataOwner, dataVehicle] = await Promise.all([
        responseOwner.json(),
        responseVehicle.json(),
      ]);

      setVehicle((prev) => ({
        ...prev,
        brand: dataVehicle.brand,
        type: dataVehicle.type,
        owner: `${dataOwner.firstname} ${dataOwner.lastname}`,
      }));
    } catch (error) {
      console.error(error);
    }
  }, [item]);

  useEffect(() => {
    setVehicle((prev) => ({
      ...prev,
      model: item.model,
      brand: item.brand,
      type: item.type,
    }));
    fetchData();
  }, [item, fetchData]);

  const handleClickArrow = () => {
    setIsVisible(!isVisible);
  };

  const handleDelete = () => {
    setDisplayDeleteModal(true);
    setItemId(item.id);
  };

  return (
    <div className="vehicle-item-admin">
      <div
        className={`vehicle-item-admin-container ${isVisible ? "is-visible" : ""}`}
      >
        <button
          type="button"
          className="vehicle-item-admin-button"
          onClick={handleClickArrow}
        >
          <img
            src={arrowImg}
            alt="déplier"
            className={`vehicle-item-admin-arrow-img ${isVisible ? "is-visible" : ""}`}
          />
        </button>
        <p className="vehicle-item-admin-model">{vehicle.model}</p>
        <p className="vehicle-item-admin-owner">{vehicle.owner}</p>
        <button
          type="button"
          className={`vehicle-item-admin-modify-button ${isVisible ? "is-visible" : ""}`}
          onClick={() => {
            setDisplayModification(true);
            setItemId(item.id);
          }}
        >
          Modifier
        </button>
        <button
          type="button"
          className="vehicle-item-admin-button"
          onClick={handleDelete}
        >
          <img
            src={trashCanImg}
            alt="supprimer"
            className={`vehicle-item-admin-trash-can-img ${isVisible ? "is-visible" : ""}`}
          />
        </button>
      </div>
      {isVisible && (
        <div className="vehicle-item-admin-full-info">
          <article>
            <p>Marque:</p>
            <p className="vehicle-item-admin-full-info-value">
              {vehicle.brand}
            </p>
          </article>
          <article>
            <p>Type de prise:</p>
            <p className="vehicle-item-admin-full-info-value">{vehicle.type}</p>
          </article>
        </div>
      )}
    </div>
  );
}
