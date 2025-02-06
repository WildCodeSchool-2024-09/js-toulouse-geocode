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
    <div className="booking-delete-modal-container">
      <article>
        <div className="booking-delete-modal-title-container">
          <h3>Suppression </h3>
        </div>
        <p>Êtes vous sûre de vouloir supprimer la réservation ?</p>
        <div className="booking-delete-modal-button-container">
          <button
            type="button"
            className="booking-delete-modal-button"
            onClick={handleCancel}
          >
            Annuler
          </button>
          <button
            type="button"
            className="booking-delete-modal-button delete"
            onClick={handleDelete}
          >
            Supprimer
          </button>
        </div>
      </article>
    </div>
  );
}
