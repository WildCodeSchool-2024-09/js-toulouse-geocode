import arrowAdminImg from "/images/arrow-admin-img.svg";
import logoutAdminImg from "/images/logout-admin-img.svg";
import stationAdminImg from "/images/station-admin-img.svg";
import updateAdminImg from "/images/update-admin-img.svg";
import userAdminImg from "/images/user-admin-img.svg";
import vehicleAdminImg from "/images/vehicle-admin-img.svg";
import { useShowNav } from "../contexts/ShowNavProvider";

export default function NavAdmin() {
  const { navOpen, setNavOpen } = useShowNav();

  const handleClickArrow = () => {
    setNavOpen(!navOpen);
  };

  return (
    <div>
      <img
        src={arrowAdminImg}
        alt="fleche de retour"
        onClick={handleClickArrow}
        onKeyDown={handleClickArrow}
      />
      {navOpen && (
        <div>
          <ul>
            <li>
              <img src={userAdminImg} alt="utilisateur" /> Utilisateurs
            </li>
            <li>
              <img src={vehicleAdminImg} alt="vehicule" /> Vehicules
            </li>
            <li>
              <img src={stationAdminImg} alt="borne" /> Bornes
            </li>
            <li>
              <img src={updateAdminImg} alt="mise à jour" /> Mise à jour
            </li>
          </ul>
          <p>
            <img src={logoutAdminImg} alt="deconnexion" /> Deconnexion
          </p>
        </div>
      )}
    </div>
  );
}
