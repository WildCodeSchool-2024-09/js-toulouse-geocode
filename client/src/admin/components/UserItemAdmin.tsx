import { useState } from "react";
import arrowImg from "/images/arrow-item-img.svg";
import trashCanImg from "/images/trash-can-img.svg";
import type { UserItemType } from "../types/itemType";
import "../styles/UserItemAdmin.css";
import { useModal } from "../contexts/ShowModalProvider";

interface UserItemAdminProps {
  item: UserItemType;
}

export default function UserItemAdmin({ item }: UserItemAdminProps) {
  const [user, setUser] = useState({
    birthday: new Date(item.birthday).toLocaleDateString(),
    firstname: item.firstname,
    insee_code: null,
    lastname: item.lastname,
    mail: item.mail,
    number_of_vehicle: item.number_of_vehicles,
    postal_code: null,
    sex: item.sex,
    city: null,
  });

  const { setDisplayModification, setDisplayDeleteModal, setItemId } =
    useModal();
  const [isVisible, setIsVisible] = useState(false);

  const fetchData = async () => {
    try {
      const [responsePostalcode, responseInseecode] = await Promise.all([
        fetch(
          `${import.meta.env.VITE_API_URL}/api/postalcodes/${item.postal_code_id}`,
        ),
        fetch(
          `${import.meta.env.VITE_API_URL}/api/inseecodes/${item.insee_code_id}`,
        ),
      ]);

      const [dataPostalcode, dataInseecode] = await Promise.all([
        responsePostalcode.json(),
        responseInseecode.json(),
      ]);

      const responseCity = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cities/${dataInseecode.city_id}`,
      );

      const dataCity = await responseCity.json();

      setUser((prev) => ({
        ...prev,
        insee_code: dataInseecode.code,
        postal_code: dataPostalcode.code,
        city: dataCity.name,
      }));
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

  return (
    <div className="user-item-admin">
      <div
        className={`user-item-admin-container ${isVisible ? "is-visible" : ""}`}
      >
        <button
          type="button"
          className="user-item-admin-button"
          onClick={handleClickArrow}
        >
          <img
            src={arrowImg}
            alt="déplier"
            className={`user-item-admin-arrow-img ${isVisible ? "is-visible" : ""}`}
          />
        </button>
        <p className="user-item-admin-name">{user.lastname}</p>
        <p className="user-item-admin-postalcode">{user.firstname}</p>
        <button
          type="button"
          className={`user-item-admin-modify-button ${isVisible ? "is-visible" : ""}`}
          onClick={() => {
            setDisplayModification(true);
            setItemId(item.id);
          }}
        >
          Modifier
        </button>
        <button
          type="button"
          className="user-item-admin-button"
          onClick={handleDelete}
        >
          <img
            src={trashCanImg}
            alt="supprimer"
            className={`user-item-admin-trash-can-img ${isVisible ? "is-visible" : ""}`}
          />
        </button>
      </div>
      {isVisible && (
        <div className="user-item-admin-full-info">
          <article>
            <p>Email:</p>
            <p className="user-item-admin-full-info-value">{user.mail}</p>
          </article>
          <article>
            <p>Sexe:</p>
            <p className="user-item-admin-full-info-value">{user.sex}</p>
          </article>
          <article>
            <p>Ville de résidence:</p>
            <p className="user-item-admin-full-info-value">{user.city}</p>
          </article>
          <article>
            <p>Date de naissance:</p>
            <p className="user-item-admin-full-info-value">{user.birthday}</p>
          </article>
          <article>
            <p>Code postal:</p>
            <p className="user-item-admin-full-info-value">
              {user.postal_code}
            </p>
          </article>
          <article>
            <p>Nombre de vehicules:</p>
            <p className="user-item-admin-full-info-value">
              {user.number_of_vehicle}
            </p>
          </article>
        </div>
      )}
    </div>
  );
}
