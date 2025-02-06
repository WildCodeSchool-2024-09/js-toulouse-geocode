import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import "../styles/BookingsInfos.css";
import { useRefresh } from "../contexts/RefreshProvider";
import BookingsInfosCard from "./BookingsInfosCard";

type Booking = {
  id: number;
  date: string;
  station_name: string;
  city_name: string;
  pdc_name: string;
};

export default function BookingsInfos() {
  const { auth } = useAuth();
  const { refresh } = useRefresh();
  const [bookingsInfos, setBookingsInfos] = useState<Booking[]>([]);

  const fetchBookingsInfos = useCallback(async () => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/bookings/user/${auth?.user_id}`,
      {
        method: "GET",
        credentials: "include",
      },
    )
      .then((response) => {
        if (response.ok) {
          response.json().then((data: Booking[]) => {
            setBookingsInfos(data);
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [auth]);

  useEffect(() => {
    fetchBookingsInfos();
    refresh;
  }, [fetchBookingsInfos, refresh]);

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
                id={item.id}
                date={new Date(item.date).toLocaleDateString("fr-FR")}
                startTime={new Date(item.date).toLocaleTimeString("fr-FR")}
                city={`${item.station_name} - ${item.city_name}`}
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
