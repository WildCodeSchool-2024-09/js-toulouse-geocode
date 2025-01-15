import "../styles/ConfirmationUploadPhoto.css";
import WarningIconSVG from "/images/warning-icon.svg";

interface ConfirmationUploadPhotoProps {
  setShowUploadConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  handleClickModifyPhoto: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setIsModifyingPhoto: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ConfirmationUploadPhoto({
  setShowUploadConfirmation,
  handleClickModifyPhoto,
  setIsModifyingPhoto,
}: ConfirmationUploadPhotoProps) {
  return (
    <section className="confirmation-upload-photo-container">
      <article className="warning-upload-text">
        <p>
          Votre photo doit être un portrait de vous-même, de bonne qualité et
          respecter les règles de bienséance.
        </p>
        <div className="advices-text">
          <img
            className="warning-icon"
            src={WarningIconSVG}
            alt="warning icon"
          />
          <p>Taille de l'image : 5Mo maximum</p>
          <p>Formats acceptés : .jpg, .jpeg, .png, .webp</p>
        </div>
        <div className="warning-upload-buttons">
          <button
            type="button"
            className="cancel-upload"
            onClick={() => setShowUploadConfirmation(false)}
          >
            Annuler
          </button>
          <button
            type="button"
            className="confirm-upload"
            onClick={(e) => {
              handleClickModifyPhoto(e);
              setIsModifyingPhoto(true);
            }}
          >
            Confirmer
          </button>
        </div>
      </article>
    </section>
  );
}
