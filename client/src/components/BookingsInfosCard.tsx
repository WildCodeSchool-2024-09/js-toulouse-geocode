import { useState } from "react";
import "../styles/BookingsInfosCard.css";
import DeleteIconSVG from "/images/delete.svg";
import DeleteBooking from "./DeleteBooking";

interface BookingsInfosCardProps {
  id: number;
  date: string;
  startTime: string;
  city: string;
}

export default function BookingsInfosCard({
  id,
  date,
  startTime,
  city,
}: BookingsInfosCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteBooking = () => {
    setIsModalOpen(true);
  };

  return (
    <article className="booking-item-container">
      <div className="booking-item-infos">
        {isModalOpen && (
          <DeleteBooking setIsModalOpen={setIsModalOpen} id={id} />
        )}
        <p>{startTime}</p>
        <p>{date}</p>
        <p>{city}</p>
      </div>
      <button
        className="delete-booking-button"
        type="button"
        onClick={handleDeleteBooking}
      >
        <img src={DeleteIconSVG} alt="Supprimer" />
      </button>
    </article>
  );
}
