import { TextField } from "@mui/material";
import "../styles/FormConnexionAdmin.css";

export default function FormConnexionAdmin() {
  return (
    <form>
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        type="email"
        className="form-connexion-admin-input"
      />
      <TextField
        id="outlined-basic"
        label="Mot de passe"
        variant="outlined"
        type="password"
        className="form-connexion-admin-input"
      />
      <button type="button" className="form-connexion-admin-button">
        Se connecter
      </button>
    </form>
  );
}
