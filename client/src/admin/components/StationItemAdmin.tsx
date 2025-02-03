import type { StationItemType } from "../types/itemType";
import "../styles/StationItemAdmin.css";
import { useEffect, useState } from "react";
import arrowImg from "/images/arrow-item-img.svg";
import trashCanImg from "/images/trash-can-img.svg";
import { useModal } from "../contexts/ShowModalProvider";

interface StationItemAdminProps {
  item: StationItemType;
}

export default function StationItemAdmin({ item }: StationItemAdminProps) {
  const [station, setStation] = useState({
    name: item.name,
    address: item.address,
    sign: null as string | null,
    operator: null as string | null,
    provider: null as string | null,
    postalcode: null as string | null,
    geo_coords: null,
    number_outlet: item.number_pdc,
    outlet: null as {
      id: number;
      name: string;
      power_max: number;
      type: string;
    } | null,
    access_charging: item.access_charging,
    accessibility: item.accessibility,
    update_date_time: item.update_date_time,
    source: item.source,
  });

  const [isVisible, setIsVisible] = useState(false);
  const { setDisplayModification, setItemId, setDisplayDeleteModal } =
    useModal();

  const fetchData = async () => {
    try {
      const [responseProvider, responseSign, responseOperator, responseOutlet] =
        await Promise.all([
          fetch(
            `${import.meta.env.VITE_API_URL}/api/providers/${item.provider_id}`,
            {
              method: "GET",
              credentials: "include",
            },
          ),
          fetch(`${import.meta.env.VITE_API_URL}/api/signs/${item.sign_id}`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(
            `${import.meta.env.VITE_API_URL}/api/operators/${item.operator_id}`,
            {
              method: "GET",
              credentials: "include",
            },
          ),
          fetch(`${import.meta.env.VITE_API_URL}/api/outlets/${item.pdc_id}`, {
            method: "GET",
            credentials: "include",
          }),
        ]);

      const [dataProvider, dataSign, dataOperator, dataOutlet] =
        await Promise.all([
          responseProvider.json(),
          responseSign.json(),
          responseOperator.json(),
          responseOutlet.json(),
        ]);

      setStation({
        ...station,
        sign: dataSign.name,
        provider: dataProvider.name,
        operator: dataOperator.name,
        outlet: dataOutlet,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickArrow = () => {
    fetchData();
    setIsVisible(!isVisible);
  };

  const handleDelete = () => {
    setDisplayDeleteModal(true);
    setItemId(item.id);
  };

  useEffect(() => {
    (async () => {
      const responsePostalcode = await fetch(
        `${import.meta.env.VITE_API_URL}/api/postalcodes/${item.postalcode_id}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const dataPostalcode = await responsePostalcode.json();
      setStation((prev) => ({ ...prev, postalcode: dataPostalcode.code }));
    })();
  }, [item.postalcode_id]);

  return (
    <div className="station-item-admin">
      <div
        className={`station-item-admin-container ${isVisible ? "is-visible" : ""}`}
      >
        <button
          type="button"
          className="station-item-admin-button"
          onClick={handleClickArrow}
        >
          <img
            src={arrowImg}
            alt="déplier"
            className={`station-item-admin-arrow-img ${isVisible ? "is-visible" : ""}`}
          />
        </button>
        <p className="station-item-admin-name">{station.name}</p>
        <p className="station-item-admin-postalcode">{station.postalcode}</p>
        <button
          type="button"
          className={`station-item-admin-modify-button ${isVisible ? "is-visible" : ""}`}
          onClick={() => {
            setDisplayModification(true);
            setItemId(item.id);
          }}
        >
          Modifier
        </button>
        <button
          type="button"
          className="station-item-admin-button"
          onClick={handleDelete}
        >
          <img
            src={trashCanImg}
            alt="supprimer"
            className={`station-item-admin-trash-can-img ${isVisible ? "is-visible" : ""}`}
          />
        </button>
      </div>
      {isVisible && (
        <div className="station-item-admin-full-info">
          <article>
            <p>Aménageur:</p>
            <p className="station-item-admin-full-info-value">
              {station.provider}
            </p>
          </article>
          <article>
            <p>Enseigne:</p>
            <p className="station-item-admin-full-info-value">{station.sign}</p>
          </article>
          <article>
            <p>Nombre PDC:</p>
            <p className="station-item-admin-full-info-value">
              {station.number_outlet}
            </p>
          </article>
          <article>
            <p>Opérateur:</p>
            <p className="station-item-admin-full-info-value">
              {station.operator}
            </p>
          </article>
          <article>
            <p>Identifiant station:</p>
            <p className="station-item-admin-full-info-value">
              {station.outlet?.name}
            </p>
          </article>
          <article>
            <p>Puissance max:</p>
            <p className="station-item-admin-full-info-value">
              {station.outlet?.power_max}
            </p>
          </article>
          <article>
            <p>Adresse station:</p>
            <p className="station-item-admin-full-info-value">
              {station.address}
            </p>
          </article>
          <article>
            <p>Type de prise:</p>
            <p className="station-item-admin-full-info-value">
              {station.outlet?.type}
            </p>
          </article>
          <article>
            <p>Acces recharge:</p>
            <p className="station-item-admin-full-info-value">
              {station.access_charging}
            </p>
          </article>
        </div>
      )}
    </div>
  );
}
