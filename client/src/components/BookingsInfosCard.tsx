import "../styles/BookingsInfosCard.css";
import DeleteIconSVG from "/images/delete.svg";

interface BookingsInfosCardProps {
  date: string;
  startTime: string;
  city: string;
}

export default function BookingsInfosCard({
  date,
  startTime,
  city,
}: BookingsInfosCardProps) {
  return (
    <article className="booking-item-container">
      <p>{startTime}</p>
      <p>{date}</p>
      <p>{city}</p>
      <button className="delete-booking-button" type="button">
        <img src={DeleteIconSVG} alt="Supprimer" />
      </button>
    </article>
  );
}
