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
    name: item.name,
    address: item.address,
    sign: null,
    operator: null,
    provider: null,
    postalcode: null,
    geo_coords: null,
    number_pdc: item.number_pdc,
    outlet: null,
    access_charging: item.access_charging,
    accessibility: item.accessibility,
    update_date_time: item.update_date_time,
    source: item.source,
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/postalcodes/${item.postalcode_id}`,
        );
        const postalcode = await response.json();

        setStation({
          ...station,
          postalcode: postalcode.code,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [item.postalcode_id, station]);

  return (
    <div className="station-item-admin-container">
      <img
        src={arrowImg}
        alt="déplier"
        className="station-item-admin-arrow-img"
      />
      <p className="station-item-admin-name">{item.name}</p>
      <p className="station-item-admin-postalcode">{station.postalcode}</p>
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
