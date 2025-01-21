import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event?.currentTarget;
    event.preventDefault();
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      navigate("/user/1");
    } else {
      setErrorMessage("L'adresse email ou le mot de passe est incorrect");
    }
  };

  return (
    <section>
      <form
        action={`${import.meta.env.VITE_API_URL}/login`}
        method="GET"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email-connection">Email</label>
        <input type="email" id="email-connection" name="email" />
        <label htmlFor="password-connection">Mot de passe</label>
        <input type="password" id="password-connection" name="password" />
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Se connecter</button>
      </form>
      <p>Pas encore inscrit ?</p>
      <a href="/register">Créez votre compte maintenant.</a>
    </section>
  );
}
