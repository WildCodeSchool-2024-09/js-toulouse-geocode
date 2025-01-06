import { Link } from "react-router-dom";
import getStartedMap from "/images/get-started-map.png";

export default function GetStartedScreen() {
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
        <Link to="/welcome2">
          <button type="button" className="prev-button">
            Précédent
          </button>
        </Link>
        <span />
        <span />
        <span />
        <Link to="/map">
          <button type="button" className="start-button">
            Démarrer
          </button>
        </Link>
      </div>
    </div>
  );
}
