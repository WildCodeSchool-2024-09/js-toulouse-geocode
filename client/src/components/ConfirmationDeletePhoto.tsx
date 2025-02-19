import "../styles/ConfirmationDeletePhoto.css";

interface ConfirmationDeletePhotoProps {
  setShowDeleteConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  handlePhotoDelete: () => void;
}

export default function ConfirmationUploadPhoto({
  setShowDeleteConfirmation,
  handlePhotoDelete,
}: ConfirmationDeletePhotoProps) {
  return (
    <section className="confirmation-delete-photo-container">
      <article className="warning-delete-text">
        <p>
          Êtes vous sûr de vouloir supprimer cette photo de profil ? Cette
          action est irréversible.
        </p>
        <div className="warning-upload-buttons">
          <button
            type="button"
            className="cancel-delete"
            onClick={() => setShowDeleteConfirmation(false)}
          >
            Annuler
          </button>
          <button
            type="button"
            className="confirm-delete"
            onClick={() => {
              handlePhotoDelete();
              setShowDeleteConfirmation(false);
            }}
          >
            Supprimer
          </button>
        </div>
      </article>
    </section>
  );
}
