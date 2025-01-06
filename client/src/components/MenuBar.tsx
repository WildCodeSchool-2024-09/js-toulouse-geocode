import { Link } from "react-router-dom";

import "../styles/MenuBar.css";

function MenuBar() {
  return (
    <div className="footer-container">
      <footer>
        <ul>
          <li>
            <Link to="/">
              <img src="./src/assets/images/home.svg" alt="home" />
            </Link>
          </li>
          <li>
            <Link to="/map">
              <img src="./src/assets/images/map.svg" alt="map" />
            </Link>
          </li>
          <li>
            <Link to="/user">
              <img src="./src/assets/images/user.svg" alt="user" />
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <img src="./src/assets/images/contact.svg" alt="contact" />
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default MenuBar;
