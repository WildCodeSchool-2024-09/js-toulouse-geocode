import { useEffect, useState } from "react";
import ProfileInfo from "../components/ProfileInfo";
import ProfileNavbar from "../components/ProfileNavbar";
import { useShowMenubar } from "../contexts/ShowMenubarProvider";
import "../styles/UserPage.css";
import BookingsInfos from "../components/BookingsInfos";
import VehiclesInfosList from "../components/VehiclesInfosList";
import { useAuth } from "../contexts/AuthProvider";
import { useRefresh } from "../contexts/RefreshProvider";

function UserPage() {
  const [userNumberOfVehicle, setUserNumberOfVehicle] = useState<number>(0);

  const { auth } = useAuth();
  const { refresh } = useRefresh();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/${auth?.user_id}`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (response.ok) {
          const data = await response.json();
          setUserNumberOfVehicle(data.number_of_vehicles);
        }
      } catch (error) {
        console.error(error);
      }
    })();
    refresh;
  }, [auth, refresh]);

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
