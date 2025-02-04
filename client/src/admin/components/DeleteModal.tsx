import { useModal } from "../contexts/ShowModalProvider";
import "../styles/UserDeleteModal.css";

interface UserDeleteModalProps {
  title: string;
  paragraph: string;
  path: string;
}

export default function DeleteModal({
  title,
  paragraph,
  path,
}: UserDeleteModalProps) {
  const { setDisplayDeleteModal, itemId, setIsRefresh, isRefresh } = useModal();

  const handleDelete = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/${path}/${itemId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response.ok) {
      setIsRefresh(!isRefresh);
      setDisplayDeleteModal(false);
    } else {
      console.error("An error occurred while deleting the user");
    }
  };

  const handleCancel = () => {
    setDisplayDeleteModal(false);
  };

  return (
    <div className="user-delete-modal-container">
      <article>
        <div className="user-delete-modal-title-container">
          <h3>Suppression {title}</h3>
        </div>
        <p>Êtes vous sûre de vouloir supprimer {paragraph} ?</p>
        <div className="user-delete-modal-button-container">
          <button
            type="button"
            className="user-delete-modal-button"
            onClick={handleCancel}
          >
            Annuler
          </button>
          <button
            type="button"
            className="user-delete-modal-button delete"
            onClick={handleDelete}
          >
            Supprimer
          </button>
        </div>
      </article>
    </div>
  );
}
