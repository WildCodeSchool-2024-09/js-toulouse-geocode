import { Link } from "react-router-dom";
import RightArrowSVG from "/images/right-arrow.svg";

export default function SecondWelcomeScreen() {
  return (
    <div className="welcome-screen">
      <div className="upper-part">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et ex
          diam. Nullam iaculis tortor at posuere aliquet. Aenean libero neque,
          ullamcorper eu gravida ut, pretium sit amet sem. Sed nec elit turpis.
          Aenean et placerat arcu. Etiam lacus turpis, egestas sed facilisis at,
          scelerisque in magna. Pellentesque imperdiet tristique viverra.
        </p>
      </div>
      <div className="lower-part">
        <Link to="/">
          <button type="button" className="prev-button">
            Précédent
          </button>
        </Link>
        <span />
        <span />
        <span />
        <Link to="/get-started">
          <button type="button" className="next-button">
            Suivant
            <img src={RightArrowSVG} alt="next-button" />
          </button>
        </Link>
      </div>
    </div>
  );
}
