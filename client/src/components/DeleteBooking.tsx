import { useRefresh } from "../contexts/RefreshProvider";
import "../styles/DeleteBooking.css";

interface DeleteBookingProps {
  setIsModalOpen: (value: boolean) => void;
  id: number;
}

export default function DeleteBooking({
  setIsModalOpen,
  id,
}: DeleteBookingProps) {
  const { refresh, setRefresh } = useRefresh();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bookings/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      if (response.ok) {
        setRefresh(!refresh);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="confirmation-delete-photo-container">
      <article className="warning-delete-text">
        <p>Êtes vous sûre de vouloir supprimer la réservation ?</p>
        <div className="warning-delete-vehicle-buttons">
          <button
            type="button"
            className="delete-vehicle-user"
            onClick={handleCancel}
          >
            Annuler
          </button>
          <button
            type="button"
            className="confirm-delete-vehicle-user"
            onClick={handleDelete}
          >
            Supprimer
          </button>
        </div>
      </article>
    </div>
  );
}
