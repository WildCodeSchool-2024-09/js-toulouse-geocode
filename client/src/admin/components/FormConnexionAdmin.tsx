import { TextField } from "@mui/material";
import "../styles/FormConnexionAdmin.css";
import { type FormEventHandler, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";

export default function FormConnexionAdmin() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/login`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: (email.current as HTMLInputElement).value,
            password: (password.current as HTMLInputElement).value,
          }),
          credentials: "include",
        },
      );

      if (response.status === 200) {
        const user = await response.json();

        setAuth(user);

        navigate("/admin/users");
      } else {
        setErrorMessage("L'adresse email ou le mot de passe est incorrect");
        console.info(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        type="email"
        className="form-connexion-admin-input"
        inputRef={email}
        sx={{
          "&:-webkit-autofill": {
            backgroundColor: "red !important",
          },
        }}
      />
      <TextField
        id="outlined-basic"
        label="Mot de passe"
        variant="outlined"
        type="password"
        className="form-connexion-admin-input"
        inputRef={password}
      />
      {errorMessage && (
        <p className="login-form-error-message">{errorMessage}</p>
      )}
      <button type="submit" className="form-connexion-admin-button">
        Se connecter
      </button>
    </form>
  );
}
