import "../styles/ProfileNavbar.css";

interface ProfileNavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function ProfileNavbar({
  activeTab,
  setActiveTab,
}: ProfileNavbarProps) {
  return (
    <div className="profile-navbar-container">
      <ul>
        <li
          onClick={() => {
            setActiveTab("profile-infos");
          }}
          onKeyDown={() => {
            setActiveTab("profile-infos");
          }}
          className={activeTab === "profile-infos" ? "active" : ""}
        >
          Profil
        </li>
        <li
          onClick={() => {
            setActiveTab("vehicles");
          }}
          onKeyDown={() => {
            setActiveTab("vehicles");
          }}
          className={activeTab === "vehicles" ? "active" : ""}
        >
          Véhicules(X)
        </li>
        <li
          onClick={() => {
            setActiveTab("reservations");
          }}
          onKeyDown={() => {
            setActiveTab("reservations");
          }}
          className={activeTab === "reservations" ? "active" : ""}
        >
          Réservations
        </li>
      </ul>
    </div>
  );
}
