import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ModifyProfileInfos.css";

interface ModifyProfileInfosProps {
  setIsModifyingProfile: (isModifyingProfile: boolean) => void;
  user: {
    lastName: string;
    firstName: string;
    sex: string;
    birthday: string;
    email: string;
    postalcode: string;
    city: string;
  };
}

export default function ModifyProfileInfos({
  setIsModifyingProfile,
  user,
}: ModifyProfileInfosProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const navigate = useNavigate();
    const form = event?.currentTarget;
    event.preventDefault();
    const formDataProdileModification = new FormData(form);
    const response = await fetch(form.action, {
      method: "PUT",
      body: formDataProdileModification,
    });
    if (response.ok) {
      navigate("/user/1");
    } else {
      setErrorMessage("Une erreur est survenue, veuillez réessayer plus tard");
    }
  };

  const formatDateToISO = (date: string) => {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  };

  const { lastName, firstName, sex, birthday, email, postalcode, city } = user;

  const formattedBirthday = formatDateToISO(birthday);

  const [lastNameInput, setLastNameInput] = useState<string>(lastName);
  const [firstNameInput, setFirstNameInput] = useState<string>(firstName);
  const [sexInput, setSexInput] = useState<string>(sex);
  const [birthdayInput, setBirthdayInput] = useState<string>(formattedBirthday);
  const [emailInput, setEmailInput] = useState<string>(email);
  const [postalcodeInput, setPostalcodeInput] = useState<string>(postalcode);
  const [cityInput, setCityInput] = useState<string>(city);

  return (
    <section className="modify-profile-infos-container">
      <form
        className="modify-profile-infos-form"
        action={`${import.meta.env.VITE_API_URL}/api/users`}
        method="put"
        onSubmit={handleSubmit}
      >
        <label htmlFor="last-name">Nom *</label>
        <input
          type="text"
          placeholder="Nom *"
          name="lastName"
          id="last-name"
          value={lastNameInput}
          onChange={(event) => setLastNameInput(event.target.value)}
        />
        <label htmlFor="first-name">Prénom *</label>
        <input
          type="text"
          placeholder="Prénom *"
          name="firstName"
          id="first-name"
          value={firstNameInput}
          onChange={(event) => setFirstNameInput(event.target.value)}
        />
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          placeholder="Email *"
          name="email"
          id="email"
          value={emailInput}
          onChange={(event) => setEmailInput(event.target.value)}
        />
        <label htmlFor="sex">Genre</label>
        <select
          name="sex"
          id="sex"
          value={sexInput}
          onChange={(event) => setSexInput(event.target.value)}
        >
          <option value="masculin">Masculin</option>
          <option value="feminin">Féminin</option>
          <option value="agenre">Non-binaire</option>
        </select>
        <label htmlFor="birthday">Date de naissance</label>
        <input
          type="date"
          name="birthday"
          id="birthday"
          value={birthdayInput}
          onChange={(event) => setBirthdayInput(event.target.value)}
        />
        <label htmlFor="location">Code postal / Ville</label>
        <div className="modify-location-container" id="location">
          <input
            className="modify-postalcode-input"
            type="text"
            placeholder="Code postal"
            name="postalcode"
            value={postalcodeInput}
            onChange={(event) => setPostalcodeInput(event.target.value)}
          />
          <input
            className="modify-city-input"
            type="text"
            placeholder="Ville"
            name="city"
            value={cityInput}
            onChange={(event) => setCityInput(event.target.value)}
          />
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <div className="modify-profile-infos-buttons">
          <button
            type="button"
            className="cancel-profile-infos-modify"
            onClick={() => setIsModifyingProfile(false)}
          >
            Annuler
          </button>
          <button type="submit" className="validate-profile-infos-modify">
            Valider
          </button>
        </div>
      </form>
    </section>
  );
}
