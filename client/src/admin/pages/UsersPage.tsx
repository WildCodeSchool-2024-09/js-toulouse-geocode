import "../styles/UsersPage.css";
import ContentAdmin from "../components/ContentAdmin";
import HeaderAdminPage from "../components/HeaderAdminPage";
import UserDeleteModal from "../components/UserDeleteModal";
import UserModification from "../components/UserModification";
import { useModal } from "../contexts/ShowModalProvider";

export default function UsersPage() {
  const { displayUserModification, displayUserDeleteModal, itemId } =
    useModal();
  return (
    <div className="users-page-container">
      <HeaderAdminPage title="Gestion des Utilisateurs" />
      <ContentAdmin titles={["Nom", "Prénom"]} path="users" />
      {displayUserModification && <UserModification userId={itemId} />}
      {displayUserDeleteModal && (
        <UserDeleteModal title="Utilisateur" paragraph="cet utilisateur" />
      )}
    </div>
  );
}
