import { useState } from "react";
import EnterMail from "../components/EnterMail";
import LoginForm from "../components/LoginForm";
import { useShowMenubar } from "../contexts/ShowMenubarProvider";
import "../styles/LoginPage.css";

export default function LoginPage() {
  const showMenuBarContext = useShowMenubar();
  showMenuBarContext.setShowMenubar(true);

  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div className="login-page-container">
      {isLogin ? (
        <article>
          <h2>Se connecter</h2>
          <LoginForm setIsLogin={setIsLogin} />
        </article>
      ) : (
        <>
          <article>
            <h2 id="header-forgotten-password">Mot de passe oublié</h2>
            <EnterMail />
          </article>
        </>
      )}
    </div>
  );
}
