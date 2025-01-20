import "../styles/BookingsInfos.css";
import BookingsInfosCard from "./BookingsInfosCard";

const bookingsInfos = [
  {
    id: 1,
    date: "2021-09-01",
    startTime: "10:00",
    city: "Toulouse",
  },
  {
    id: 2,
    date: "2021-09-02",
    startTime: "14:00",
    city: "Blagnac",
  },
  {
    id: 3,
    date: "2021-09-03",
    startTime: "16:00",
    city: "Toulouse",
  },
];

export default function BookingsInfos() {
  return (
    <section className="bookings-info-container">
      {bookingsInfos.length !== 0 ? (
        <>
          <article className="bookings-infos-header">
            <h1>Mes réservations</h1>
          </article>
          <article className="grid-bookings-infos-cards">
            {bookingsInfos.map((item) => (
              <BookingsInfosCard
                key={item.id}
                date={item.date}
                startTime={item.startTime}
                city={item.city}
              />
            ))}
          </article>
        </>
      ) : (
        <article className="no-actual-bookings-container">
          <p className="no-actual-bookings">
            Vous n'avez aucune réservation en cours.
          </p>
        </article>
      )}
    </section>
  );
}
