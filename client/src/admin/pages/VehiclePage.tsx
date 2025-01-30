import ContentAdmin from "../components/ContentAdmin";
import DeleteModal from "../components/DeleteModal";
import HeaderAdminPage from "../components/HeaderAdminPage";
import VehicleModification from "../components/VehicleModification";
import { useModal } from "../contexts/ShowModalProvider";

export default function VehiclePage() {
  const { displayModification, displayDeleteModal, itemId } = useModal();
  return (
    <div className="vehicle-page-container">
      <HeaderAdminPage title="Gestion des Vehicules" />
      <ContentAdmin titles={["Model", "Propriétaire"]} path="vehicles" />
      {displayModification && <VehicleModification vehicleId={itemId} />}
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
