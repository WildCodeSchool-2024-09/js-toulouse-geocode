import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

interface ChangePasswordProps {
  userId: number;
}

export default function ChangePassword({ userId }: ChangePasswordProps) {
  const [passwordValid, setPasswordValid] = useState(false);
  const [bothPasswordsEqual, setBothPasswordsEqual] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const testString = (str: string) => {
    // Vérifie si la longueur de la chaîne est supérieure à 13
    if (str.length <= 12) {
      return false;
    }

    // Vérifie la présence d'au moins un des caractères spéciaux
    const specialChars = /[!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]/;
    if (!specialChars.test(str)) {
      return false;
    }

    // Vérifie la présence d'au moins un chiffre
    const digitChars = /[0-9]/;
    if (!digitChars.test(str)) {
      return false;
    }

    // Vérifie la présence d'au moins une minuscule et une majuscule
    const hasLowerCase = /[a-z]/;
    const hasUpperCase = /[A-Z]/;
    if (!hasLowerCase.test(str) || !hasUpperCase.test(str)) {
      return false;
    }

    return true;
  };

  const handleChangePassword = () => {
    const password = passwordRef.current?.value;
    if (password !== undefined) {
      setPasswordValid(testString(password));
    }
  };

  const handleChangeConfirmPassword = () => {
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;
    setBothPasswordsEqual(password === confirmPassword);
  };

  const handleSubmit = async () => {
    const password = passwordRef.current?.value;
    try {
      if (password === undefined) return;

      const formData = new FormData();

      formData.append("password", password);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/update-password/${userId}`,
        {
          method: "PUT",
          body: formData,
        },
      );

      if (response.ok) {
        navigate("/login");
      }
    } catch (error) {}
  };

  return (
    <div className="login-user-form-container">
      <form onSubmit={handleSubmit} id="password-forgotten-user-form">
        <label
          htmlFor="email-connection"
          className="label-user-login"
          id="label-login-mail-forgotten"
        >
          Mot de passe
        </label>
        <input
          type="password"
          id="email-connection"
          name="email"
          ref={passwordRef}
          onChange={handleChangePassword}
          className={passwordValid ? "password" : "password error"}
        />
        {!passwordValid && (
          <p>
            {`Le mot de passe doit contenir au moins 13 caractères, une majuscule,
            une minuscule, un chiffre et un caractère spécial (!"#$%&'()*+,\x5C-./:;<=>?@[\x5D^_\x60\x7B|\x7D~)`}
          </p>
        )}
        <label
          htmlFor="email-connection"
          className="label-user-login"
          id="label-login-mail-forgotten"
        >
          Confirmation du mot de passe
        </label>
        <input
          type="password"
          id="email-connection"
          name="email"
          ref={confirmPasswordRef}
          onChange={handleChangeConfirmPassword}
          className={
            bothPasswordsEqual ? "password-confirm" : "password-confirm error"
          }
        />
        {!bothPasswordsEqual && <p>Les mots de passe ne correspondent pas</p>}
        <div className="button-container">
          <button type="submit" id="button-get-numbers-password">
            Confirmer
          </button>
        </div>
      </form>
    </div>
  );
}
