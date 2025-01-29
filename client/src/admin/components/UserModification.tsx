import { useEffect, useRef, useState } from "react";
import { useModal } from "../contexts/ShowModalProvider";
import type { cityType } from "../types/itemType";

interface UserModificationProps {
  userId: number | null;
}

function UserModification({ userId }: UserModificationProps) {
  const { setDisplayUserModification } = useModal();
  const cityInputElement = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [emailValid, setEmailValid] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [cities, setCities] = useState(Array<cityType>(0));

  const [lastNameInput, setLastNameInput] = useState<string>("");
  const [firstNameInput, setFirstNameInput] = useState<string>("");
  const [sexInput, setSexInput] = useState<string>("");
  const [cityInput, setCityInput] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [initialEmailInput, setInitialEmailInput] = useState<string>("");
  const [postalcodeInput, setPostalcodeInput] = useState<string>("");
  const [birthdayInput, setBirthdayInput] = useState<string>("");
  const [nbVehiclesInput, setNbVehiclesInput] = useState<number>(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event?.currentTarget;

    event.preventDefault();
    if (form.email.value !== initialEmailInput) {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/verify-email?email=${form.email.value}`,
      );
      if (response.ok) {
        setEmailExists(true);
        return;
      }
    }

    let response = await fetch(
      `https://geo.api.gouv.fr/communes?codePostal=${form.postalcode.value}&nom=${form.city.value}&fields=nom,code,departement,region`,
    );
    if (!response.ok) {
      setErrorMessage(
        "Veuillez entrer une ville valide en fonction du code postal.",
      );
      return;
    }

    const dataReceived = await response.json();
    if (dataReceived.length === 0) {
      setErrorMessage(
        "Veuillez entrer une ville valide en fonction du code postal.",
      );
      return;
    }

    const inseeCode = dataReceived[0].code;
    const department = dataReceived[0].departement.nom;
    const region = dataReceived[0].region.nom;

    setEmailExists(false);
    const formData = new FormData(form);
    formData.append("insee_code", inseeCode);
    formData.append("departement", department);
    formData.append("region", region);

    console.info("form Data: ", JSON.stringify(formData));
    response = await fetch(form.action, {
      method: "PUT",
      body: formData,
    });
    if (response.ok) {
      setDisplayUserModification(false);
    } else {
      setErrorMessage("Une erreur est survenue, veuillez réessayer plus tard");
    }
  };

  const handleClose = () => {
    setDisplayUserModification(false);
  };

  const isEmailValid = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChangeEmail = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const email = event.target.value;
    setEmailValid(isEmailValid(email));
    setEmailInput(email);
  };

  const handleChangeFirstName = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFirstNameInput(event.target.value);
  };
  const handleChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastNameInput(event.target.value);
  };
  const handleChangeSex = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSexInput(event.target.value);
  };
  const handleChangeBirthday = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBirthdayInput(event.target.value);
  };
  const handleChangeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCityInput(event.target.value);
  };
  const handleChangeNbVehicles = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNbVehiclesInput(Number(event.target.value));
  };

  const handleChangePostalcode = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const postalcode = event.target.value;
    setPostalcodeInput(postalcode);
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

  const fetchUserInfos = () => {
    if (!userId) return;
    fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}`)
      .then((response) => response.json())
      .then((userData) => {
        fetch(
          `${import.meta.env.VITE_API_URL}/api/postalcodes/${
            userData.postal_code_id
          }`,
        )
          .then((postalcodeResponse) => postalcodeResponse.json())
          .then((postalcodeData) => {
            fetch(
              `${import.meta.env.VITE_API_URL}/api/inseecodes/${userData.insee_code_id}`,
            )
              .then((inseeCodeResponse) => inseeCodeResponse.json())
              .then((inseeCodeData) => {
                fetch(
                  `${import.meta.env.VITE_API_URL}/api/cities/${inseeCodeData.city_id}`,
                )
                  .then((cityResponse) => cityResponse.json())
                  .then((cityData) => {
                    setEmailValid(isEmailValid(userData.mail));
                    setFirstNameInput(userData.firstname);
                    setLastNameInput(userData.lastname);
                    setSexInput(userData.sex);
                    setCityInput(cityData.name);
                    setEmailInput(userData.mail);
                    setInitialEmailInput(userData.mail);
                    setPostalcodeInput(postalcodeData.code);
                    setBirthdayInput(formatDateToISO(userData.birthday));
                    setNbVehiclesInput(userData.number_of_vehicles);
                  });
              });
          });
      });
  };

  useEffect(fetchUserInfos, []);

  return (
    <div className="user-modification-container">
      <article className="user-modification-dialog_box">
        <caption>
          <h2>Modification des données de l'utilisateur</h2>
          <button type="button" onClick={handleClose}>
            <img src="/images/close.svg" alt="close" />
          </button>
        </caption>
        <section>
          <form
            action={`${import.meta.env.VITE_API_URL}/api/users/${userId}`}
            method="post"
            onSubmit={handleSubmit}
          >
            <div className="group">
              <label htmlFor="lastName">Nom</label>
              <input
                type="text"
                id="lastName"
                name="lastname"
                value={lastNameInput}
                onChange={handleChangeLastName}
              />
            </div>
            <div className="group">
              <label htmlFor="firstName">Prénom</label>
              <input
                type="text"
                id="firstName"
                name="firstname"
                value={firstNameInput}
                onChange={handleChangeFirstName}
              />
            </div>
            <div className="group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="mail"
                onChange={handleChangeEmail}
                value={emailInput}
              />
              {!emailValid && <p>Adresse email invalide.</p>}{" "}
            </div>
            <div className="group">
              <label htmlFor="sex">Genre</label>
              <select
                name="sex"
                id="sex"
                value={sexInput}
                onChange={handleChangeSex}
              >
                <option value="masculin">Masculin</option>
                <option value="feminin">Féminin</option>
                <option value="agenre">Non-binaire</option>
              </select>
            </div>
            <div className="group">
              <label htmlFor="birthday">Date de naissance</label>
              <input
                type="date"
                name="birthday"
                id="birthday"
                value={birthdayInput}
                onChange={handleChangeBirthday}
              />
            </div>
            <div className="group">
              <label htmlFor="location">Code postal</label>
              <input
                type="text"
                placeholder="Code postal"
                name="postalcode"
                onChange={handleChangePostalcode}
                value={postalcodeInput}
              />
            </div>
            <div className="group">
              <label htmlFor="location">Ville</label>
              <input
                type="text"
                placeholder="Ville"
                name="city"
                list="cities"
                defaultValue=""
                ref={cityInputElement}
                value={cityInput}
                onChange={handleChangeCity}
              />
              <datalist id="cities">
                {cities.map((city) => (
                  <option key={city.code} value={city.nom} />
                ))}
              </datalist>
            </div>
            <div className="group">
              <label htmlFor="vehicles">Nombre de véhicule</label>
              <input
                type="number"
                name="vehicles"
                id="vehicles"
                value={nbVehiclesInput}
                onChange={handleChangeNbVehicles}
              />
            </div>
            <div className="submit">
              <button type="submit">Sauvegarder</button>
              {errorMessage && <p>{errorMessage}</p>}
              {emailExists && <p>L'email ci-dessus est déjà utilisé.</p>}
            </div>
          </form>
        </section>
      </article>
    </div>
  );
}

export default UserModification;
