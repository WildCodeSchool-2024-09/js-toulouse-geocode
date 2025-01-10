import FormConnexionAdmin from "../components/FormConnexionAdmin";
import HeaderAdminPage from "../components/HeaderAdminPage";

export default function ConnexionAdminPage() {
  return (
    <div>
      <HeaderAdminPage title="" />
      <div>
        <section>
          <h1>Bienvenue</h1>
          <h2>Sur le compte administrateur</h2>
        </section>
        <FormConnexionAdmin />
      </div>
    </div>
  );
}
