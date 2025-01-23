import { useState } from "react";
import "../styles/ModifyProfileInfos.css";
import { useAuth } from "../contexts/AuthProvider";

interface ModifyProfileInfosProps {
  setIsModifyingProfile: (isModifyingProfile: boolean) => void;
  user: {
    birthday: string;
    firstname: string;
    hashed_password: string;
    id: number;
    lastname: string;
    mail: string;
    number_of_vehicle: number;
    postal_code_id: number;
    sex: string;
  };
  city: string;
  getUser: () => void;
}

export default function ModifyProfileInfos({
  setIsModifyingProfile,
  user,
  city,
  getUser,
}: ModifyProfileInfosProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { auth } = useAuth();
  const { lastname, firstname, sex, birthday, mail, postal_code_id } = user;

  const [lastNameInput, setLastNameInput] = useState<string>(lastname);
  const [firstNameInput, setFirstNameInput] = useState<string>(firstname);
  const [sexInput, setSexInput] = useState<string>(sex);

  const [emailInput, setEmailInput] = useState<string>(mail);
  const [postalcodeInput, setPostalcodeInput] = useState<string>(
    postal_code_id.toString(),
  );
  const [cityInput, setCityInput] = useState<string>(city);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event?.currentTarget;
    const formDataProfileModification = new FormData(form);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/${auth?.user_id}`,
      {
        method: "PUT",
        body: formDataProfileModification,
      },
    );
    if (response.ok) {
      setIsModifyingProfile(false);
      getUser();
    } else {
      setErrorMessage("Une erreur est survenue, veuillez réessayer plus tard");
    }
  };

  const formatDateToISO = (date: string) => {
    const newDate = new Date(date);
    const formattedDate = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, "0")}-${String(newDate.getDate()).padStart(2, "0")}`;
    return formattedDate;
  };
  const formattedBirthday = formatDateToISO(birthday);
  const [_, setBirthdayInput] = useState<string>(formattedBirthday);

  return (
    <section className="modify-profile-infos-container">
      <form className="modify-profile-infos-form" onSubmit={handleSubmit}>
        <label htmlFor="last-name">Nom *</label>
        <input
          type="text"
          placeholder="Nom *"
          name="lastname"
          id="last-name"
          value={lastNameInput}
          onChange={(event) => setLastNameInput(event.target.value)}
        />
        <label htmlFor="first-name">Prénom *</label>
        <input
          type="text"
          placeholder="Prénom *"
          name="firstname"
          id="first-name"
          value={firstNameInput}
          onChange={(event) => setFirstNameInput(event.target.value)}
        />
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          placeholder="Email *"
          name="mail"
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
          value={formatDateToISO(user.birthday)}
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
