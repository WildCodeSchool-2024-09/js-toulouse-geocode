import "../styles/StationPage.css";
import ContentAdmin from "../components/ContentAdmin";
import HeaderAdminPage from "../components/HeaderAdminPage";
import StationModification from "../components/StationModification";
import { useModal } from "../contexts/ShowModalProvider";

export default function StationPage() {
  const { itemId, displayStationModification } = useModal();
  return (
    <div className="station-page-container">
      <HeaderAdminPage title="Gestion des Bornes" />
      <ContentAdmin titles={["Nom", "Code postal"]} path="stations" />
      {displayStationModification && <StationModification stationId={itemId} />}
    </div>
  );
}
