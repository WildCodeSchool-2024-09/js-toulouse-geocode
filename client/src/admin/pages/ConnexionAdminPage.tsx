import { useEffect } from "react";
import FormConnexionAdmin from "../components/FormConnexionAdmin";
import HeaderAdminPage from "../components/HeaderAdminPage";
import { useShowNav } from "../contexts/ShowNavProvider";

export default function ConnexionAdminPage() {
  const { setNavVisible } = useShowNav();

  useEffect(() => {
    setNavVisible(false);
  }, [setNavVisible]);

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
