import "../styles/ConfirmationDeletePhoto.css";

interface ConfirmationDeleteProfileProps {
  setIsDeletingProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ConfirmationUploadPhoto({
  setIsDeletingProfile,
}: ConfirmationDeleteProfileProps) {
  return (
    <section className="confirmation-delete-photo-container">
      <article className="warning-delete-text">
        <p>
          Êtes vous sûr de vouloir supprimer votre profil ? Cette action est
          irréversible.
        </p>
        <div className="warning-upload-buttons">
          <button
            type="button"
            className="cancel-upload"
            onClick={() => setIsDeletingProfile(false)}
          >
            Annuler
          </button>
          <button
            type="button"
            className="confirm-upload"
            onClick={() => {
              setIsDeletingProfile(false);
            }}
          >
            Confirmer
          </button>
        </div>
      </article>
    </section>
  );
}
