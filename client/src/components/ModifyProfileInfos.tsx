import { useRef, useState } from "react";
import "../styles/ModifyProfileInfos.css";
import { useAuth } from "../contexts/AuthProvider";

interface cityType {
  nom: string;
  code: string;
  codeDepartement: string;
}

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
    insee_code_id: number;
    sex: string;
  };
  city: string;
  getUser: () => void;
  postalcode: number | null;
}

export default function ModifyProfileInfos({
  setIsModifyingProfile,
  user,
  city,
  getUser,
  postalcode,
}: ModifyProfileInfosProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { auth } = useAuth();
  const { lastname, firstname, sex, birthday, mail, insee_code_id } = user;

  const [lastNameInput, setLastNameInput] = useState<string>(lastname);
  const [firstNameInput, setFirstNameInput] = useState<string>(firstname);
  const [sexInput, setSexInput] = useState<string>(sex);
  const [cityInput, setCityInput] = useState<string>(city);
  const [emailInput, setEmailInput] = useState<string>(mail);
  const [postalcodeInput, setPostalcodeInput] = useState<string>(
    postalcode ? postalcode.toString() : "",
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const postalcodeForm = (
      form.elements.namedItem("postalcode") as HTMLInputElement
    )?.value;

    const cityNameForm = (form.elements.namedItem("city") as HTMLInputElement)
      .value;

    // Appel à l'API pour obtenir les codes INSEE et départementaux
    const codeInseeDepartementRegionResponse = await fetch(
      `https://geo.api.gouv.fr/communes?nom=${cityNameForm}&codePostal=${postalcodeForm}&fields=nom,code,departement,region`,
    );

    const codeInseeDepartementRegionData =
      await codeInseeDepartementRegionResponse.json();

    const inseeCode = codeInseeDepartementRegionData[0].code;

    const department = codeInseeDepartementRegionData[0].departement.nom;

    const region = codeInseeDepartementRegionData[0].region.nom;

    const formDataProfileModification = new FormData(form);
    formDataProfileModification.append("insee_code", inseeCode);
    formDataProfileModification.append("city", cityNameForm);
    formDataProfileModification.append("departement", department);
    formDataProfileModification.append("region", region);

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

  const [cities, setCities] = useState(Array<cityType>(0));
  const cityInputElement = useRef<HTMLInputElement>(null);

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

  const formatDateToISO = (date: string): string => {
    const parsedDate = new Date(date);

    // Extraction des valeurs de la date locale.
    const year = parsedDate.getFullYear();
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
    const day = parsedDate.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formattedBirthday = formatDateToISO(birthday);

  const [birthdayInput, setBirthdayInput] = useState<string>(formattedBirthday);

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
          value={formatDateToISO(birthdayInput)}
          onChange={(event) => setBirthdayInput(event.target.value)}
        />
        <label htmlFor="location">Code postal / Ville</label>
        <div className="modify-location-container" id="location">
          <input
            className="modify-postalcode-input"
            type="number"
            placeholder="Code postal"
            name="postalcode"
            value={postalcodeInput}
            onChange={(event) => {
              setPostalcodeInput(event.target.value);
              handleChangePostalcode(event);
              if (cityInputElement.current) {
                cityInputElement.current.value = "";
              }
            }}
          />
          <input type="hidden" name="insee_code_id" value={insee_code_id} />
          <input
            type="text"
            placeholder="Ville"
            name="city"
            list="cities"
            defaultValue={cityInput}
            ref={cityInputElement}
            onChange={(event) => setCityInput(event.target.value)}
          />
          <datalist id="cities">
            {cities.map((city) => (
              <option key={city.code} value={city.nom} />
            ))}
          </datalist>
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
