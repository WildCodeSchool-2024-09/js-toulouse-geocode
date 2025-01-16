import type { StationItemType } from "../types/itemType";
import "../styles/StationItemAdmin.css";
import { useEffect, useState } from "react";
import arrowImg from "/images/arrow-item-img.svg";
import trashCanImg from "/images/trash-can-img.svg";

interface StationItemAdminProps {
  item: StationItemType;
}

export default function StationItemAdmin({ item }: StationItemAdminProps) {
  const [station, setStation] = useState({
    operator: null,
    postalcode: null,
  });

  useEffect(() => {
    (async () => {
      const [responseOperator, responsePostalcode] = await Promise.all([
        fetch(
          `${import.meta.env.VITE_API_URL}/api/operators/${item.operator_id}`,
        ),
        fetch(
          `${import.meta.env.VITE_API_URL}/api/postalcodes/${item.postalcode_id}`,
        ),
      ]);

      const [operator, postalcode] = await Promise.all([
        responseOperator.json(),
        responsePostalcode.json(),
      ]);

      setStation({
        operator: operator.name,
        postalcode: postalcode.code,
      });
    })();
  }, [item]);
  return (
    <div className="station-item-admin-container">
      <img
        src={arrowImg}
        alt="déplier"
        className="station-item-admin-arrow-img"
      />
      <p>{item.name}</p>
      <p>{station.postalcode}</p>
      <button type="button" className="station-item-admin-modify-button">
        Modifier
      </button>
      <img
        src={trashCanImg}
        alt="supprimer"
        className="station-item-admin-trash-can-img"
      />
    </div>
  );
}
