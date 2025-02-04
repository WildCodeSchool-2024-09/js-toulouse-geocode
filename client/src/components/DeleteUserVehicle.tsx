import "../styles/DeleteUserVehicle.css";

interface ConfirmationDeleteVehicleProps {
  vehicleId: number;
  setIsDeletingVehicle: React.Dispatch<React.SetStateAction<boolean>>;
  refreshVehicles: () => void;
}

export default function ConfirmationUploadPhoto({
  vehicleId,
  setIsDeletingVehicle,
  refreshVehicles,
}: ConfirmationDeleteVehicleProps) {
  const handleVehicleDeletion = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/vehicles/${vehicleId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (response.ok) {
        setIsDeletingVehicle(false);
        refreshVehicles();
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
            Confirmer
          </button>
        </div>
      </article>
    </section>
  );
}
