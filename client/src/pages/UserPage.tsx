import { useState } from "react";
import ProfileInfo from "../components/ProfileInfo";
import ProfileNavbar from "../components/ProfileNavbar";
import { useShowMenubar } from "../contexts/ShowMenubarProvider";
import "../styles/UserPage.css";

function UserPage() {
  const showMenuBarContext = useShowMenubar();
  showMenuBarContext.setShowMenubar(true);
  const [activeTab, setActiveTabs] = useState<string>("profile-infos");
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
      <ProfileNavbar setActiveTab={setActiveTabs} />
      {renderTabContent()}
    </div>
  );
}

export default UserPage;
