import { useRef, useState } from "react";
import "../styles/LoginPage.css";
import "../styles/ChangePassword.css";

interface ChangePasswordProps {
  userId: number;
  setIsLogin: (isLogin: number) => void;
}

export default function ChangePassword({
  userId,
  setIsLogin,
}: ChangePasswordProps) {
  const [passwordValid, setPasswordValid] = useState(false);
  const [bothPasswordsEqual, setBothPasswordsEqual] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const password = passwordRef.current?.value;
    try {
      if (password === undefined) return;

      const data = {
        password: password,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/update-password/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (response.ok) {
        if (passwordRef.current) {
          passwordRef.current.value = "";
        }
        if (confirmPasswordRef.current) {
          confirmPasswordRef.current.value = "";
        }
        setIsLogin(0);
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
          id="password-input"
          name="password"
          ref={passwordRef}
          onChange={handleChangePassword}
          className={passwordValid ? "password" : "password error"}
        />
        {!passwordValid && (
          <p id="update-password-error">
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
          id="confirm-password-input" // Changed from email-connection
          name="confirm-password"
          ref={confirmPasswordRef}
          onChange={handleChangeConfirmPassword}
          className={
            bothPasswordsEqual ? "password-confirm" : "password-confirm error"
          }
        />
        {!bothPasswordsEqual && (
          <p id="update-password-error">
            Les mots de passe ne correspondent pas
          </p>
        )}
        <div className="button-container">
          <button type="submit" id="button-get-numbers-password">
            Confirmer
          </button>
        </div>
      </form>
    </div>
  );
}
