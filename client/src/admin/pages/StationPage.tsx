import "../styles/StationPage.css";
import ContentAdmin from "../components/ContentAdmin";
import DeleteModal from "../components/DeleteModal";
import HeaderAdminPage from "../components/HeaderAdminPage";
import { useModal } from "../contexts/ShowModalProvider";

export default function StationPage() {
  const { displayDeleteModal } = useModal();
  return (
    <div className="station-page-container">
      <HeaderAdminPage title="Gestion des Bornes" />
      <ContentAdmin titles={["Nom", "Code postal"]} path="stations" />
      {displayDeleteModal && (
        <DeleteModal
          title="de la borne"
          paragraph="cette borne"
          path="stations"
        />
      )}
    </div>
  );
}
