import { useRefresh } from "../contexts/RefreshProvider";
import "../styles/DeleteUserVehicle.css";
import { useAuth } from "../contexts/AuthProvider";

interface ConfirmationDeleteVehicleProps {
  vehicleId: number;
  setIsDeletingVehicle: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ConfirmationUploadPhoto({
  vehicleId,
  setIsDeletingVehicle,
}: ConfirmationDeleteVehicleProps) {
  const { refresh, setRefresh } = useRefresh();

  const { auth } = useAuth();

  const handleVehicleDeletion = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/vehicles/${vehicleId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "DELETE",
          body: JSON.stringify({ user_id: auth?.user_id }),
          credentials: "include",
        },
      );

      if (response.ok) {
        setRefresh(!refresh);
        setIsDeletingVehicle(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="confirmation-delete-photo-container">
      <article className="warning-delete-text">
        <p>
          Êtes vous sûr de vouloir supprimer ce véhicule ? Cette action est
          irréversible.
        </p>
        <div className="warning-delete-vehicle-buttons">
          <button
            type="button"
            className="delete-vehicle-user"
            onClick={() => setIsDeletingVehicle(false)}
          >
            Annuler
          </button>
          <button
            type="button"
            className="confirm-delete-vehicle-user"
            onClick={() => {
              handleVehicleDeletion();
            }}
          >
            Supprimer
          </button>
        </div>
      </article>
    </section>
  );
}
