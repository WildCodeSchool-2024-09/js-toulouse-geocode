import { Link } from "react-router-dom";

import "../styles/MenuBar.css";
import { useShowMenubar } from "../contexts/ShowMenubarProvider";

function MenuBar() {
  const showMenubarContext = useShowMenubar();

  if (!showMenubarContext.showMenubar) {
    return null;
  }

  return (
    <div className="footer-container">
      <footer>
        <ul>
          <li>
            <Link to="/">
              <img src="/images/home.svg" alt="home" />
            </Link>
          </li>
          <li>
            <Link to="/map">
              <img src="/images/map.svg" alt="map" />
            </Link>
          </li>
          <li>
            <Link to="/user">
              <img src="/images/user.svg" alt="user" />
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <img src="/images/contact.svg" alt="contact" />
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default MenuBar;
