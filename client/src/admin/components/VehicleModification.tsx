import { useEffect, useRef, useState } from "react";
import { useModal } from "../contexts/ShowModalProvider";

interface VehicleModificationProps {
  vehicleId: number | null;
}

function VehicleModification({ vehicleId }: VehicleModificationProps) {
  const { setDisplayModification } = useModal();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [userId, setUserId] = useState("");

  const brandInputElement = useRef<HTMLInputElement>(null);
  const modelInputElement = useRef<HTMLInputElement>(null);
  const typeInputElement = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event?.currentTarget;

    event.preventDefault();

    const formData = new FormData(form);
    formData.append("user_id", userId);

    const response = await fetch(form.action, {
      method: "PUT",
      body: formData,
      credentials: "include",
    });
    if (response.ok) {
      setDisplayModification(false);
    } else {
      setErrorMessage("Une erreur est survenue, veuillez réessayer plus tard");
    }

    setDisplayModification(false);
  };

  const handleClose = () => {
    setDisplayModification(false);
  };

  const fetchUserInfos = () => {
    // Fetch user infos
    if (vehicleId == null) {
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/vehicles/${vehicleId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (brandInputElement.current) {
          brandInputElement.current.value = data.brand;
        }
        if (modelInputElement.current) {
          modelInputElement.current.value = data.model;
        }
        if (typeInputElement.current) {
          typeInputElement.current.value = data.type;
        }
        setUserId(data.user_id);
      });
  };

  useEffect(fetchUserInfos, []);

  return (
    <div className="vehicle-modification-container">
      <article className="vehicle-modification-dialog_box">
        <caption>
          <h2>Modification des données de la borne</h2>
          <button type="button" onClick={handleClose}>
            <img src="/images/close.svg" alt="close" />
          </button>
        </caption>
        <section>
          <form
            action={`${import.meta.env.VITE_API_URL}/api/vehicles/${vehicleId}`}
            method="put"
            onSubmit={handleSubmit}
          >
            <div className="group">
              <label htmlFor="brand-name">Marque</label>
              <input
                type="text"
                id="brand-name"
                name="brand_name"
                ref={brandInputElement}
              />
            </div>
            <div className="group">
              <label htmlFor="model-name">Modèle</label>
              <input
                type="text"
                id="model-name"
                name="model_name"
                ref={modelInputElement}
              />
            </div>
            <div className="group">
              <label htmlFor="type-name">Type de prise</label>
              <input
                type="text"
                id="type-name"
                name="type_name"
                ref={typeInputElement}
              />
            </div>
            <div className="submit">
              <button type="submit">Sauvegarder</button>
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          </form>
        </section>
      </article>
    </div>
  );
}

export default VehicleModification;
