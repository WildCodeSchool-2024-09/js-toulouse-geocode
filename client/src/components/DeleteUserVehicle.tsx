interface ConfirmationDeleteVehicleProps {
  setIsDeletingVehicle: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ConfirmationUploadPhoto({
  setIsDeletingVehicle,
}: ConfirmationDeleteVehicleProps) {
  return (
    <section className="confirmation-delete-photo-container">
      <article className="warning-delete-text">
        <p>
          Êtes vous sûr de vouloir supprimer ce véhicule ? Cette action est
          irréversible.
        </p>
        <div className="warning-delete-buttons">
          <button
            type="button"
            className="cancel-delete"
            onClick={() => setIsDeletingVehicle(false)}
          >
            Annuler
          </button>
          <button
            type="button"
            className="confirm-delete"
            onClick={() => {
              setIsDeletingVehicle(false);
            }}
          >
            Confirmer
          </button>
        </div>
      </article>
    </section>
  );
}
