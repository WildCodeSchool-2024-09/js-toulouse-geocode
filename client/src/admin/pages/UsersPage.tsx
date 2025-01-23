import "../styles/UsersPage.css";
// import ContentAdmin from "../components/ContentAdmin";
import HeaderAdminPage from "../components/HeaderAdminPage";

export default function UsersPage() {
  return (
    <div className="users-page-container">
      <HeaderAdminPage title="Gestion des Utilisateurs" />
      {/* <ContentAdmin /> */}
    </div>
  );
}
