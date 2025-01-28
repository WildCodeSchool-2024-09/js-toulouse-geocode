import { useEffect, useState } from "react";
import arrowImg from "/images/arrow-item-img.svg";
import trashCanImg from "/images/trash-can-img.svg";
import type { VehicleItemType } from "../types/itemType";
import "../styles/VehicleItemAdmin.css";

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

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${item.user_id}`,
      );
      const data = await response.json();
      setVehicle({
        ...vehicle,
        owner: `${data.firstname} ${data.lastname}`,
      });
    })();
  }, [vehicle, item.user_id]);

  const handleClickArrow = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="vehicle-item-admin">
      <div
        className={`vehicle-item-admin-container ${isVisible ? "is-visible" : ""}`}
      >
        <img
          src={arrowImg}
          alt="déplier"
          className={`vehicle-item-admin-arrow-img ${isVisible ? "is-visible" : ""}`}
          onClick={handleClickArrow}
          onKeyDown={handleClickArrow}
        />
        <p className="vehicle-item-admin-model">{vehicle.model}</p>
        <p className="vehicle-item-admin-owner">{vehicle.owner}</p>
        <button
          type="button"
          className={`vehicle-item-admin-modify-button ${isVisible ? "is-visible" : ""}`}
        >
          Modifier
        </button>
        <img
          src={trashCanImg}
          alt="supprimer"
          className={`vehicle-item-admin-trash-can-img ${isVisible ? "is-visible" : ""}`}
        />
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
