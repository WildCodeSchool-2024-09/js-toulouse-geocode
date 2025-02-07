import { useEffect, useRef, useState } from "react";
import BackLeftArrow from "/images/back-left-arrow.svg";
import "../styles/EnterTempCode.css";

interface EnterTempCodeProps {
  setIsLogin: (isLogin: number) => void;
  email: string;
  setMail: (mail: string) => void;
  userId: number;
}

export default function EnterTempCode({
  setIsLogin,
  email,
  userId,
}: EnterTempCodeProps) {
  const [messageError, setMessageError] = useState<string>("");
  const inputData = [
    { id: "otp-1" },
    { id: "otp-2" },
    { id: "otp-3" },
    { id: "otp-4" },
    { id: "otp-5" },
    { id: "otp-6" },
    { id: "otp-7" },
    { id: "otp-8" },
  ];
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 8);
  }, []);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;

    if (value && index < 7) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const chars = pastedData.split("");

    chars.forEach((char, i) => {
      const input = inputRefs.current[index + i];
      if (input) {
        input.value = char;
        const event = new Event("input", { bubbles: true });
        input.dispatchEvent(event);
      }
    });

    const nextIndex = index + chars.length;
    if (inputRefs.current[nextIndex]) {
      inputRefs.current[nextIndex].focus();
    }
  };

  const createTempCode = async () => {
    try {
      setMessageError("");

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

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      setIsLogin(2);
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetTempCode = async (user_id: number) => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/tempcode/${user_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleSubmit = async () => {
    const code = inputRefs.current
      .map((input) => input?.value)
      .filter((value) => value)
      .join("");

    const tempCodesResponse = await fetch(
      `${import.meta.env.VITE_API_URL}/api/tempcode/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const tempCodesData = await tempCodesResponse.json();

    if (tempCodesData[0].code === code) {
      handleResetTempCode(userId);
      setIsLogin(3);
    } else {
      for (const input of inputRefs.current) {
        if (input) {
          input.value = "";
        }
      }
      setMessageError("Le code est incorrect");
      handleResetTempCode(userId);
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
          Rentrez votre code
        </label>
        <div className="container" id="all-eight-inputs-for-code">
          {inputData.map((input, i) => (
            <input
              key={input.id}
              type="text"
              maxLength={1}
              id="checktempcode"
              name="tempcode"
              ref={(el) => {
                if (el) inputRefs.current[i] = el;
              }}
              onChange={(e) => handleChange(i, e)}
              onPaste={(e) => handlePaste(e, i)}
            />
          ))}
        </div>
        <p id="error-message-temp-code">{messageError}</p>
        <div className="button-container">
          <button
            type="button"
            id="button-get-numbers-password"
            onClick={messageError === "" ? handleSubmit : createTempCode}
          >
            {messageError === "" ? "Confirmer" : "Renvoyer un code"}
          </button>
        </div>
      </form>
    </div>
  );
}
