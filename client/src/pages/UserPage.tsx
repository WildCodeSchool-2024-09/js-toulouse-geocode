import { useEffect, useState } from "react";
import ProfileInfo from "../components/ProfileInfo";
import ProfileNavbar from "../components/ProfileNavbar";
import { useShowMenubar } from "../contexts/ShowMenubarProvider";
import "../styles/UserPage.css";
import { useNavigate } from "react-router-dom";
import BookingsInfos from "../components/BookingsInfos";
import VehiclesInfosList from "../components/VehiclesInfosList";
import { useAuth } from "../contexts/AuthProvider";

function UserPage() {
  const [userNumberOfVehicle, setUserNumberOfVehicle] = useState<number>(0);

  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    } else {
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
    }
  }, [auth, navigate]);

  const showMenuBarContext = useShowMenubar();
  const [activeTab, setActiveTabs] = useState<string>("profile-infos");
  useEffect(() => {
    showMenuBarContext.setShowMenubar(true);
  }, [showMenuBarContext]);
  const renderTabContent = () => {
    switch (activeTab) {
      case "profile-infos":
        return <ProfileInfo />;
      case "vehicles":
        return <VehiclesInfosList />;
      case "reservations":
        return <BookingsInfos />;
      default:
        return <ProfileInfo />;
    }
  };

  return (
    <>
      {auth && (
        <div className="user-page-container">
          <ProfileNavbar
            activeTab={activeTab}
            setActiveTab={setActiveTabs}
            userNumberOfVehicle={userNumberOfVehicle}
          />
          {renderTabContent()}
        </div>
      )}
    </>
  );
}

export default UserPage;
