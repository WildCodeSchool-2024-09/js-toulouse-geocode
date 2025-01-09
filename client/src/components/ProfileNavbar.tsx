interface ProfileNavbarProps {
  setActiveTab: (tab: string) => void;
}

export default function ProfileNavbar({ setActiveTab }: ProfileNavbarProps) {
  return (
    <div className="profile-navbar-container">
      <ul>
        <li
          onClick={() => {
            setActiveTab("profile-info");
          }}
          onKeyDown={() => {
            setActiveTab("profile-info");
          }}
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
        >
          Réservations
        </li>
      </ul>
    </div>
  );
}
