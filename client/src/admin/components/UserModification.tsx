import { useRef, useState } from "react";
import { useModifyModal } from "../contexts/ShowModifyModalProvider";

type cityType = {
  nom: string;
  code: string;
  codeDepartement: string;
};

type User = {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  sex: string;
  birthday: string;
  postalcode: string;
  city: string;
  nb_vehicles: number;
};

interface UserModificationProps {
  userId: number;
}

function UserModification({ userId }: UserModificationProps) {
  const { setDisplayUserModification } = useModifyModal();
  const cityInputElement = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [emailValid, setEmailValid] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [cities, setCities] = useState(Array<cityType>(0));
  const [user, setUser] = useState<User | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event?.currentTarget;

    event.preventDefault();
    if (user && form.email.value !== user.email) {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/verify-email?email=${form.email.value}`,
      );
      if (response.ok) {
        setEmailExists(true);
        return;
      }
    }
    setEmailExists(false);
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: "POST",
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

  const handleChangeEmail = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const email = event.target.value;
    setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
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

  fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}`)
    .then((response) => response.json())
    .then((user) => setUser(user));

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
                name="lastName"
                value={user?.lastName}
              />
            </div>
            <div className="group">
              <label htmlFor="firstName">Prénom</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={user?.firstName}
              />
            </div>
            <div className="group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChangeEmail}
                value={user?.email}
              />
              {!emailValid && <p>Adresse email invalide.</p>}{" "}
            </div>
            <div className="group">
              <label htmlFor="sex">Genre</label>
              <select name="sex" id="sex" value={user?.sex}>
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
                value={user?.birthday}
              />
            </div>
            <div className="group">
              <label htmlFor="location">Code postal</label>
              <input
                type="text"
                placeholder="Code postal"
                name="postalcode"
                onChange={handleChangePostalcode}
                value={user?.postalcode}
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
                value={user?.city}
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
                value={user?.nb_vehicles}
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
