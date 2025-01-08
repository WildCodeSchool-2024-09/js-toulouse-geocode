import { Link } from "react-router-dom";
import getStartedMap from "/images/get-started-map.png";
import { useShowMenubar } from "../context/ShowMenubarProvider";
import "../styles/GetStartedScreen.css";

export default function GetStartedScreen() {
  const { setShowMenubar } = useShowMenubar();

  return (
    <div className="get-started-screen">
      <div className="upper-part">
        <p>
          Prêt à recharger ? Localisez une borne et démarrez votre session en un
          clic.
        </p>
        <img src={getStartedMap} alt="Exemple Map" />
      </div>
      <div className="lower-get-started-part">
        <div className="nav-buttons">
          <Link to="/welcome2">
            <button type="button" className="prev-button">
              Précédent
            </button>
          </Link>

          <Link to="/map" onClick={() => setShowMenubar(true)}>
            <button type="button" className="start-button">
              Démarrer
            </button>
          </Link>
        </div>
        <div className="nav-indicators">
          <span />
          <span />
          <span style={{ backgroundColor: "var(--green-light-color)" }} />
        </div>
      </div>
    </div>
  );
}
