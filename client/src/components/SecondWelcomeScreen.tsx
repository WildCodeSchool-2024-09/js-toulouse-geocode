import { Link } from "react-router-dom";
import RightArrowSVG from "/images/right-arrow.svg";
import "../styles/SecondWelcomeScreen.css";

export default function SecondWelcomeScreen() {
  return (
    <div className="second-welcome-screen">
      <div className="upper-part">
        <p>
          Geocode – Trouvez et gérez vos bornes de recharge électriques Geocode
          vous permet de localiser facilement une borne de recharge à proximité,
          de réserver un créneau horaire adapté à vos besoins et de gérer
          plusieurs véhicules électriques en toute simplicité. Profitez d'une
          expérience fluide et optimisée pour la recharge de vos véhicules.
        </p>
      </div>
      <div className="second-welcome-screen-lower-part">
        <div className="nav-buttons">
          <Link to="/">
            <button type="button" className="prev-button">
              Précédent
            </button>
          </Link>

          <Link to="/get-started">
            <button type="button" className="next-button">
              Suivant
              <img src={RightArrowSVG} alt="next-button" />
            </button>
          </Link>
        </div>
        <div className="nav-indicators">
          <span />
          <span style={{ backgroundColor: "var(--green-light-color)" }} />
          <span />
        </div>
      </div>
    </div>
  );
}
