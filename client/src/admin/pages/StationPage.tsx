import "../styles/StationPage.css";
import ContentAdmin from "../components/ContentAdmin";
import HeaderAdminPage from "../components/HeaderAdminPage";

export default function StationPage() {
  return (
    <div className="station-page-container">
      <HeaderAdminPage title="Gestion des Bornes" />
      <ContentAdmin titles={["Nom", "Code insee commune"]} path="stations" />
    </div>
  );
}
