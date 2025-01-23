import "../styles/UsersPage.css";
import { useState } from "react";
/*import ContentAdmin from "../components/ContentAdmin";*/
import HeaderAdminPage from "../components/HeaderAdminPage";
import UserModification from "../components/UserModification";

export default function UsersPage() {
  const [displayUserModification, setDisplayUserModification] = useState(true);
  return (
    <div className="users-page-container">
      <HeaderAdminPage title="Gestion des Utilisateurs" />
      {/* <ContentAdmin /> */}
      {displayUserModification && (
        <UserModification
          userId={1}
          setDisplayUserModification={setDisplayUserModification}
        />
      )}
    </div>
  );
}
