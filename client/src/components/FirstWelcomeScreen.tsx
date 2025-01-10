import { Link } from "react-router-dom";
import LogoGeoCodeSVG from "/images/logo-welcome-screen.svg";
import RightArrowSVG from "/images/right-arrow.svg";
import "/src/styles/FirstWelcomeScreen.css";
import { useShowMenubar } from "../contexts/ShowMenubarProvider";

export default function welcomeScreen() {
  const showMenuBarContext = useShowMenubar();
  showMenuBarContext.setShowMenubar(false);

  return (
    <div className="first-welcome-screen">
      <div className="logo-upper-part">
        <img src={LogoGeoCodeSVG} alt="logo welcome screen" />
        <div className="logo-description">
          <h1>GEOCODE</h1>
          <p>BORNES DE RECHARGES ÉLECTRIQUES</p>
        </div>
      </div>
      <div className="welcome-mid-part">
        <p>
          Application de réservation de stations de recharge pour véhicules
          électriques.
        </p>
      </div>
      <div className="first-lower-part">
        <div className="nav-buttons">
          <Link to="/map">
            <button type="button" className="skip-button">
              Passer
            </button>
          </Link>
          <Link to="/welcome2">
            <button type="button" className="next-button">
              Suivant
              <img src={RightArrowSVG} alt="next-button" />
            </button>
          </Link>
        </div>
        <div className="nav-indicators">
          <span style={{ backgroundColor: "var(--green-light-color)" }} />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
