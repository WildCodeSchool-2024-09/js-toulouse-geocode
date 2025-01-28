import "../styles/UsersPage.css";
import ContentAdmin from "../components/ContentAdmin";
import HeaderAdminPage from "../components/HeaderAdminPage";
import UserModification from "../components/UserModification";
import { useModifyModal } from "../contexts/ShowModifyModalProvider";

export default function UsersPage() {
  const { displayUserModification } = useModifyModal();
  return (
    <div className="users-page-container">
      <HeaderAdminPage title="Gestion des Utilisateurs" />
      <ContentAdmin titles={["Nom", "Prénom"]} path="users" />
      {displayUserModification && <UserModification userId={1} />}
    </div>
  );
}
