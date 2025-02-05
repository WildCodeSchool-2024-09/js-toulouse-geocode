import { type FormEventHandler, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { setAuth } = useAuth();

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    try {
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
        setErrorMessage("L'adresse email ou le mot de passe est incorrect");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email-connection">Email</label>
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
        <div className="button-container">
          <button type="submit">Se connecter</button>
        </div>
        <p className="p-not-register">Pas encore inscrit ?</p>
        <a href="/register">Créez votre compte maintenant.</a>
      </form>
    </section>
  );
}
