import closeCrossSvg from "/images/close.svg";
import "../styles/AddUserVehicle.css";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useRefresh } from "../contexts/RefreshProvider";

interface AddUserVehicleProps {
  setIsAddingVehicle: (value: boolean) => void;
}

export default function AddUserVehicle({
  setIsAddingVehicle,
}: AddUserVehicleProps) {
  const { auth } = useAuth();
  const brandRef = useRef<HTMLInputElement>(null);
  const modelRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLInputElement>(null);

  const [userNumberOfVehicle, setUserNumberOfVehicle] = useState<number>(0);
  const { refresh, setRefresh } = useRefresh();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/${auth?.user_id}`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (response.ok) {
          const data = await response.json();
          setUserNumberOfVehicle(data.number_of_vehicles);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [auth]);

  const handleAddUserVehicle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const brand = brandRef.current?.value;
    const model = modelRef.current?.value;
    const type = typeRef.current?.value;

    if (!brand || !model || !type) {
      alert("Tous les champs sont obligatoires.");
      return;
    }

    const vehicleData = {
      user_id: auth?.user_id,
      brand,
      model,
      type,
      userNumberOfVehicle: userNumberOfVehicle + 1,
    };

    fetch(`${import.meta.env.VITE_API_URL}/api/vehicles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(vehicleData),
    })
      .then((response) => {
        if (response.ok) {
          setIsAddingVehicle(false);
          setRefresh(!refresh);
        } else {
          alert("Erreur lors de l'ajout du véhicule");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Erreur lors de l'ajout du véhicule");
      });
  };

  return (
    <div className="background-modal-user-vehicle-add">
      <section className="modal-user-vehicle-add">
        <div className="add-vehicle-header">
          <h2>Ajouter un véhicule</h2>
          <button
            type="button"
            className="add-user-vehicle-button"
            onClick={() => setIsAddingVehicle(false)}
          >
            <img src={closeCrossSvg} alt="close button" />
          </button>
        </div>
        <form
          action="/api/vehicles"
          className="add-user-vehicle-form"
          onSubmit={handleAddUserVehicle}
        >
          <label htmlFor="vehicle-brand">Marque</label>
          <input
            type="text"
            id="vehicle-brand"
            name="vehicle-brand"
            placeholder="Marque"
            ref={brandRef}
            required
          />
          <label htmlFor="vehicle-model">Modèle</label>
          <input
            type="text"
            id="vehicle-model"
            name="vehicle-model"
            placeholder="Modèle"
            ref={modelRef}
            required
          />
          <label htmlFor="vehicle-type">Type de recharge</label>
          <input
            type="text"
            id="vehicle-type"
            name="vehicle-type"
            placeholder="Type de recharge"
            ref={typeRef}
            required
          />
          <button className="add-user-vehicule-button" type="submit">
            Ajouter
          </button>
        </form>
      </section>
    </div>
  );
}
