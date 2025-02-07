import { useState } from "react";
import EnterMail from "../components/EnterMail";
import LoginForm from "../components/LoginForm";
import { useShowMenubar } from "../contexts/ShowMenubarProvider";
import "../styles/LoginPage.css";
import ChangePassword from "../components/ChangePassword";
import EnterTempCode from "../components/EnterTempCode";

export default function LoginPage() {
  const showMenuBarContext = useShowMenubar();
  showMenuBarContext.setShowMenubar(true);

  const [isLogin, setIsLogin] = useState<number>(0);
  const [mail, setMail] = useState<string>("");
  const [userId, setUserId] = useState<number>(0);

  if (isLogin === 0) {
    return (
      <div className="login-page-container">
        <article>
          <h2>Se connecter</h2>
          <LoginForm setIsLogin={setIsLogin} />
        </article>
      </div>
    );
  }
  if (isLogin === 1) {
    return (
      <div className="login-page-container">
        <article>
          <h2 id="header-forgotten-password">Mot de passe oublié</h2>
          <EnterMail
            setIsLogin={setIsLogin}
            setMail={setMail}
            setUserId={setUserId}
          />
        </article>
      </div>
    );
  }
  if (isLogin === 2) {
    return (
      <div className="login-page-container">
        <article>
          <h2 id="header-forgotten-password">Mot de passe oublié</h2>
          <EnterTempCode
            setIsLogin={setIsLogin}
            email={mail}
            setMail={setMail}
            userId={userId}
          />
        </article>
      </div>
    );
  }
  return (
    <div className="login-page-container">
      <article>
        <h2>Reinitialiser votre mot de passe</h2>
        <ChangePassword userId={userId} />
      </article>
    </div>
  );
}
