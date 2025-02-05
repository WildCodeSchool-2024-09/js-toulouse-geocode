import { useState } from "react";
import arrowAdminImg from "/images/arrow-admin-img.svg";
import logoutAdminImg from "/images/logout-admin-img.svg";
import stationAdminImg from "/images/station-admin-img.svg";
import updateAdminImg from "/images/update-admin-img.svg";
import userAdminImg from "/images/user-admin-img.svg";
import vehicleAdminImg from "/images/vehicle-admin-img.svg";
import { useShowNav } from "../contexts/ShowNavProvider";
import "../styles/NavAdmin.css";
import { Link } from "react-router-dom";

export default function NavAdmin() {
  const { navOpen, setNavOpen } = useShowNav();
  const [rotateArrow, setRotateArrow] = useState(true);

  const handleClickArrow = () => {
    setNavOpen(!navOpen);
    setRotateArrow(!rotateArrow);
  };

  const disconnect = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/logout`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (response.ok) {
        window.location.reload();
      } else {
        throw new Error("Une erreur est survenue lors de la déconnexion");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={
        rotateArrow
          ? "nav-admin-container close close-nav-admin"
          : "nav-admin-container open-nav-admin"
      }
      onClick={rotateArrow ? handleClickArrow : () => {}}
      onKeyDown={rotateArrow ? handleClickArrow : () => {}}
    >
      <img
        src={arrowAdminImg}
        alt="fleche de retour"
        onClick={handleClickArrow}
        onKeyDown={handleClickArrow}
        className={`arrow-nav-admin ${rotateArrow ? "open-rotate-arrow rotated-arrow nav-admin-arrow" : "close-rotate-arrow nav-admin-arrow"}`}
      />
      {navOpen && (
        <div className="nav-admin-content">
          <ul>
            <li>
              <Link to={"/admin/users"} className="nav-admin-link">
                <img src={userAdminImg} alt="utilisateur" /> Utilisateurs
              </Link>
            </li>
            <li>
              <Link to={"/admin/vehicles"} className="nav-admin-link">
                <img src={vehicleAdminImg} alt="vehicule" /> Véhicules
              </Link>
            </li>
            <li>
              <Link to={"/admin/stations"} className="nav-admin-link">
                <img src={stationAdminImg} alt="borne" /> Bornes
              </Link>
            </li>
            <li>
              <Link to={"/"} className="nav-admin-link">
                <img src={updateAdminImg} alt="mise à jour" /> Mise à jour
              </Link>
            </li>
          </ul>
          <div className="nav-admin-line"> </div>
          <button type="button" onClick={disconnect}>
            <img src={logoutAdminImg} alt="deconnexion" /> Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}
