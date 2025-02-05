import "../styles/VehiclePage.css";
import ContentAdmin from "../components/ContentAdmin";
import DeleteModal from "../components/DeleteModal";
import HeaderAdminPage from "../components/HeaderAdminPage";
import VehicleModification from "../components/VehicleModification";
import { useModal } from "../contexts/ShowModalProvider";

export default function VehiclePage() {
  const { displayModification, displayDeleteModal, item } = useModal();
  return (
    <div className="vehicle-page-container">
      <HeaderAdminPage title="Gestion des Vehicules" />
      <ContentAdmin titles={["Model", "Propriétaire"]} path="vehicles" />
      {displayModification && <VehicleModification vehicle={item} />}
      {displayDeleteModal && (
        <DeleteModal
          title="du véhicule"
          paragraph="ce véhicule"
          path="vehicles"
        />
      )}
    </div>
  );
}
