import ContentAdmin from "../components/ContentAdmin";
import HeaderAdminPage from "../components/HeaderAdminPage";

export default function VehiclePage() {
  return (
    <div className="station-page-container">
      <HeaderAdminPage title="Gestion des Vehicules" />
      <ContentAdmin titles={["Model", "Propriétaire"]} path="vehicles" />
    </div>
  );
}
