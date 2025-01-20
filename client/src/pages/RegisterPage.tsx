import RegisterForm from "../components/RegisterForm";
import { useShowMenubar } from "../contexts/ShowMenubarProvider";
import "../styles/RegisterPage.css";

function RegisterPage() {
  const showMenuBarContext = useShowMenubar();
  showMenuBarContext.setShowMenubar(true);

  return (
    <div className="register-page-container">
      <article>
        <h2>Créer un compte</h2>
        <RegisterForm />
      </article>
    </div>
  );
}

export default RegisterPage;
