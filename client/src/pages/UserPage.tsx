import { useEffect, useState } from "react";
import ProfileInfo from "../components/ProfileInfo";
import ProfileNavbar from "../components/ProfileNavbar";
import { useShowMenubar } from "../contexts/ShowMenubarProvider";
import "../styles/UserPage.css";

function UserPage() {
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
        return <div>Vehicles</div>;
      case "reservations":
        return <div>Reservations</div>;
      default:
        return <ProfileInfo />;
    }
  };

  return (
    <div className="user-page-container">
      <ProfileNavbar activeTab={activeTab} setActiveTab={setActiveTabs} />
      {renderTabContent()}
    </div>
  );
}

export default UserPage;
