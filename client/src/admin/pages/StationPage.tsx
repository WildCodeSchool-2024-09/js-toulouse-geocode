import "../styles/StationPage.css";
import { useState } from "react";
import ContentAdmin from "../components/ContentAdmin";
import HeaderAdminPage from "../components/HeaderAdminPage";
import StationModification from "../components/StationModification";

export default function StationPage() {
  const [displayModalModification] = useState(true);
  return (
    <div className="station-page-container">
      <HeaderAdminPage title="Gestion des Bornes" />
      <ContentAdmin titles={["Nom", "Code postal"]} path="stations" />
      {displayModalModification && <StationModification stationId={1} />}
    </div>
  );
}
