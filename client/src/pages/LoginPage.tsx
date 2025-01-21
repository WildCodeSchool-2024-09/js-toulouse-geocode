import LoginForm from "../components/LoginForm";
import { useShowMenubar } from "../contexts/ShowMenubarProvider";

export default function LoginPage() {
  const showMenuBarContext = useShowMenubar();
  showMenuBarContext.setShowMenubar(true);

  return (
    <div className="login-page-container">
      <article>
        <h2>Se connecter</h2>
        <LoginForm />
      </article>
    </div>
  );
}
