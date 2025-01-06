import { Link } from "react-router-dom";
import LogoGeoCodeSVG from "/images/logo-welcome-screen.svg";
import RightArrowSVG from "/images/right-arrow.svg";

export default function welcomeScreen() {
  return (
    <div className="first-welcome-screen">
      <div className="logo-upper-part">
        <img src={LogoGeoCodeSVG} alt="logo welcome screen" />
        <h6>GEOCODE</h6>
        <p>BORNES DE RECHARGES ÉLECTRIQUES</p>
      </div>
      <div className="mid-part">
        <p>
          Application de réservation de stations de recharge pour véhicules
          électriques.
        </p>
      </div>
      <div className="lower-part">
        <Link to="/map">
          <button type="button" className="skip-button">
            Passer
          </button>
        </Link>
        <span />
        <span />
        <span />
        <Link to="/welcome2">
          <button type="button" className="next-button">
            Suivant
            <img src={RightArrowSVG} alt="next-button" />
          </button>
        </Link>
      </div>
    </div>
  );
}
