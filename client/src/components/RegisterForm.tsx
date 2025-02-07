import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../types/tools.ts";

type cityType = {
  nom: string;
  code: string;
  codeDepartement: string;
};

function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const [passwordValid, setPasswordValid] = useState(false);
  const [bothPasswordsEqual, setBothPasswordsEqual] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [cities, setCities] = useState(Array<cityType>(0));

  const cityInputElement = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event?.currentTarget;

    event.preventDefault();
    let response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/verify-email?email=${form.email.value}`,
    );
    if (response.ok) {
      setEmailExists(true);
      return;
    }

    const cityElement = document.getElementById("city") as HTMLInputElement;
    if (!cityElement) {
      return;
    }

    const postalcodeElement = document.getElementById(
      "postalcode",
    ) as HTMLInputElement;
    if (!postalcodeElement) {
      return;
    }

    response = await fetch(
      `https://geo.api.gouv.fr/communes?codePostal=${postalcodeElement.value}&nom=${cityElement.value}&fields=nom,code,codeDepartement,codeRegion`,
    );
    if (!response.ok) {
      setErrorMessage("Veuillez entrer une ville valide.");
      return;
    }

    const dataReceived = await response.json();
    if (dataReceived.length === 0) {
      setErrorMessage("Veuillez entrer une ville valide.");
      return;
    }

    setEmailExists(false);
    const formData = new FormData(form);
    response = await fetch(form.action, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    if (response.ok) {
      navigate("/login");
    } else {
      setErrorMessage("Une erreur est survenue, veuillez réessayer plus tard");
    }
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setPasswordValid(testString(password));
  };

  const handleChangeConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const password = event.target.value;
    const confirmPasswordElement = document.getElementById(
      "password",
    ) as HTMLInputElement;
    setBothPasswordsEqual(password === confirmPasswordElement?.value);
  };

  const handleChangeEmail = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const email = event.target.value;
    setEmailValid(isValidEmail(email));
  };

  const handleChangePostalcode = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const postalcode = event.target.value;
    fetch(
      `https://geo.api.gouv.fr/communes?codePostal=${postalcode}&fields=nom,code,codeDepartement,codeRegion`,
    )
      .then((response) => response.json())
      .then((cityResponses: cityType[]) => {
        if (cityResponses.length !== 0) {
          setCities(cityResponses);
          if (cityInputElement.current) {
            cityInputElement.current.value = "";
          }
        }
      });
  };

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

  return (
    <section>
      <form
        action={`${import.meta.env.VITE_API_URL}/api/users`}
        method="post"
        onSubmit={handleSubmit}
      >
        <label htmlFor="last-name">Nom *</label>
        <input type="text" placeholder="Nom *" name="lastName" id="last-name" />
        <label htmlFor="first-name">Prénom *</label>
        <input
          type="text"
          placeholder="Prénom *"
          name="firstName"
          id="first-name"
        />
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          placeholder="Email *"
          name="email"
          id="email"
          onChange={handleChangeEmail}
          className={emailValid ? "email" : "email error"}
        />
        {!emailValid && <p>Adresse email invalide.</p>}
        <label htmlFor="sex">Genre</label>
        <select name="sex" id="sex">
          <option value="masculin">Masculin</option>
          <option value="feminin">Féminin</option>
          <option value="agenre">Non-binaire</option>
        </select>
        <label htmlFor="birthday">Date de naissance</label>
        <input type="date" name="birthday" id="birthday" />
        <label htmlFor="location">Code postal / Ville</label>
        <div className="location-container" id="location">
          <input
            type="text"
            placeholder="Code postal"
            id="postalcode"
            name="postalcode"
            onChange={handleChangePostalcode}
          />
          <input
            type="text"
            placeholder="Ville"
            id="city"
            name="city"
            list="cities"
            defaultValue=""
            ref={cityInputElement}
          />
          <datalist id="cities">
            {cities.map((city) => (
              <option key={city.code} value={city.nom} />
            ))}
          </datalist>
        </div>
        <label htmlFor="password">Mot de passe *</label>
        <input
          type="password"
          placeholder="Mot de passe *"
          name="password"
          id="password"
          onChange={handleChangePassword}
          className={passwordValid ? "password" : "password error"}
        />
        {!passwordValid && (
          <p>
            {`Le mot de passe doit contenir au moins 13 caractères, une majuscule,
            une minuscule, un chiffre et un caractère spécial (!"#$%&'()*+,\x5C-./:;<=>?@[\x5D^_\x60\x7B|\x7D~)`}
          </p>
        )}
        {errorMessage && <p>{errorMessage}</p>}
        <label htmlFor="password-confirm">Confirmer le mot de passe *</label>
        <input
          type="password"
          placeholder="Confirmer le mot de passe *"
          name="passwordConfirm"
          id="password-confirm"
          className={
            bothPasswordsEqual ? "password-confirm" : "password-confirm error"
          }
          onChange={handleChangeConfirmPassword}
        />
        {!bothPasswordsEqual && <p>Les mots de passe ne correspondent pas</p>}
        {emailExists && <p>L'email ci-dessus est déjà utilisé.</p>}
        <div className="button-container">
          <button
            type="submit"
            disabled={!(passwordValid && bothPasswordsEqual)}
          >
            Créer le compte
          </button>
        </div>
      </form>
    </section>
  );
}

export default RegisterForm;
