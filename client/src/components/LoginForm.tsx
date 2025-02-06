import { type FormEventHandler, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import "../styles/LoginForm.css";

interface LoginFormProps {
  setIsLogin: (isLogin: boolean) => void;
}

export default function LoginForm({ setIsLogin }: LoginFormProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { setAuth } = useAuth();

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    try {
      const responseEmail = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/verify-email?email=${emailRef.current?.value}`,
      );
      if (!responseEmail.ok) {
        setErrorMessage("L'adresse email n'est associée à aucun compte.");
        return;
      }
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: (emailRef.current as HTMLInputElement).value,
            password: (passwordRef.current as HTMLInputElement).value,
          }),
          credentials: "include",
        },
      );

      if (response.status === 200) {
        const user = await response.json();

        setAuth(user);

        navigate("/user");
      } else {
        setErrorMessage("L'adresse email ou le mot de passe est incorrect.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className="login-user-form"
        id="login-user-form"
      >
        <label htmlFor="email-connection" className="label-user-login">
          Email
        </label>
        <input type="email" id="email-connection" name="email" ref={emailRef} />
        <label htmlFor="password-connection">Mot de passe</label>
        <input
          type="password"
          id="password-connection"
          name="password"
          ref={passwordRef}
        />
        {errorMessage && (
          <p className="login-form-error-message">{errorMessage}</p>
        )}
        <button
          type="button"
          id="password-forgotten"
          onClick={() => setIsLogin(false)}
        >
          Vous avez oublié votre mot de passe ?{" "}
        </button>
        <div className="button-container">
          <button type="submit" id="login-user-button">
            Se connecter
          </button>
        </div>
        <p className="p-not-register" id="p-not-register">
          Pas encore inscrit ?
        </p>
        <a href="/register" id="p-not-register">
          Créez votre compte maintenant.
        </a>
      </form>
    </section>
  );
}
