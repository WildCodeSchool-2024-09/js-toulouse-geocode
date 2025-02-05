import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import "../styles/ConfirmationDeletePhoto.css";

interface ConfirmationDeleteProfileProps {
  setIsDeletingProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ConfirmationUploadPhoto({
  setIsDeletingProfile,
}: ConfirmationDeleteProfileProps) {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleProfileDeletion = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${auth?.user_id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (response.ok) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
              handleProfileDeletion();
            }}
          >
            Confirmer
          </button>
        </div>
      </article>
    </section>
  );
}
