import { useRef, useState } from "react";
import type { FormEventHandler } from "react";
import "../styles/EnterMail.css";
import BackLeftArrow from "/images/back-left-arrow.svg";
import { isValidEmail } from "../types/tools";

interface LoginFormProps {
  setIsLogin: (isLogin: number) => void;
  setMail: (mail: string) => void;
  setUserId: (userId: number) => void;
}

export default function EnterMail({
  setIsLogin,
  setMail,
  setUserId,
}: LoginFormProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    try {
      if (!emailRef.current) {
        throw new Error("Email ref is not defined");
      }

      setErrorMessage("");

      const email = emailRef.current.value;

      if (!isValidEmail(email)) {
        setErrorMessage("Email invalide");
        return;
      }

      event.preventDefault();
      const verifyMailResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/verify-email?email=${email}`,
      );
      const userId = await verifyMailResponse.json();
      if (!verifyMailResponse.ok) {
        setErrorMessage("Cet email n'est rattaché à aucun compte");
        return;
      }

      setUserId(userId);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tempcode/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      emailRef.current.value = "";

      if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data.message);
        throw new Error(data.message);
      }

      setMail(email);

      setIsLogin(2);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-user-form-container">
      <form onSubmit={handleSubmit} id="password-forgotten-user-form">
        <label
          htmlFor="email-connection"
          className="label-user-login"
          id="label-login-mail-forgotten"
        >
          <button
            id="prev-login-mail"
            type="button"
            onClick={() => setIsLogin(0)}
          >
            <img src={BackLeftArrow} alt="" />
          </button>
          Rentrez votre email
        </label>
        <input type="email" id="email-connection" name="email" ref={emailRef} />
        {errorMessage && (
          <p className="login-form-error-message">{errorMessage}</p>
        )}
        <div className="button-container">
          <button type="submit" id="button-get-numbers-password">
            Envoyer le mail
          </button>
        </div>
      </form>
    </div>
  );
}
