import "../styles/UsersPage.css";
import ContentAdmin from "../components/ContentAdmin";
import DeleteModal from "../components/DeleteModal";
import HeaderAdminPage from "../components/HeaderAdminPage";
import UserModification from "../components/UserModification";
import { useModal } from "../contexts/ShowModalProvider";

export default function UsersPage() {
  const { displayModification, displayDeleteModal, item } = useModal();
  return (
    <div className="users-page-container">
      <HeaderAdminPage title="Gestion des Utilisateurs" />
      <ContentAdmin titles={["Nom", "Prénom"]} path="users" />
      {displayModification && <UserModification user={item} />}
      {displayDeleteModal && (
        <DeleteModal
          title="de l'utilisateur"
          paragraph="cet utilisateur"
          path="users"
        />
      )}
    </div>
  );
}
