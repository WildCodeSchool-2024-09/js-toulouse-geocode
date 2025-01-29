import ContentAdmin from "../components/ContentAdmin";
import DeleteModal from "../components/DeleteModal";
import HeaderAdminPage from "../components/HeaderAdminPage";
import { useModal } from "../contexts/ShowModalProvider";

export default function VehiclePage() {
  const { displayUserDeleteModal } = useModal();
  return (
    <div className="station-page-container">
      <HeaderAdminPage title="Gestion des Vehicules" />
      <ContentAdmin titles={["Model", "Propriétaire"]} path="vehicles" />
      {displayUserDeleteModal && (
        <DeleteModal
          title="Utilisateur"
          paragraph="cet utilisateur"
          path="vehicles"
        />
      )}
    </div>
  );
}
