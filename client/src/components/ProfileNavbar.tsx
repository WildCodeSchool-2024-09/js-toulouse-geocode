import { useEffect, useState } from "react";
import "../styles/ProfileNavbar.css";
import { useAuth } from "../contexts/AuthProvider";

interface ProfileNavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function ProfileNavbar({
  activeTab,
  setActiveTab,
}: ProfileNavbarProps) {
  const { auth } = useAuth();

  const [userNumberOfVehicle, setUserNumberOfVehicle] = useState<number>(0);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/${auth?.user_id}`,
        );

        if (response.ok) {
          const data = await response.json();
          setUserNumberOfVehicle(data.number_of_vehicles);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [auth]);

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
          Véhicules ({userNumberOfVehicle})
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
