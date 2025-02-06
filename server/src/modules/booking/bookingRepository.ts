import databaseClient, {
  type Rows,
  type Result,
} from "../../../database/client";

type BookingRaw = {
  id: number;
  pdc_id: number;
  vehicule_id: number;
  reservation_date: string;
};

type Booking = {
  id: number;
  date: string;
  station_name: string;
  city_name: string;
  pdc_name: string;
};

class bookingRepository {
  async create(newBooking: Omit<BookingRaw, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO booking (date, vehicle_id, pdc_id) VALUES (?, ?, ?)",
      [newBooking.reservation_date, newBooking.vehicule_id, newBooking.pdc_id],
    );

    return result.insertId;
  }

  async readAllByUser(user_id: number) {
    const [bookings] = await databaseClient.query<Rows>(
      `SELECT bk.id as id, bk.date as date, st.name as station_name, ci.name as city_name, pdc.name as pdc_name
      FROM booking bk 
      inner join pdc on bk.pdc_id = pdc.id
      inner join vehicle vh on bk.vehicle_id = vh.id
      inner join user us on vh.user_id = us.id
      inner join station st on pdc.station_id = st.id
      inner join insee_code ic on st.insee_code_id = ic.id
      inner join city ci on ic.city_id = ci.id
      WHERE us.id = ?`,
      [user_id],
    );

    return bookings as Booking[];
  }

  async delete(id: number) {
    await databaseClient.query<Result>("delete from booking where id = ?", [
      id,
    ]);
  }
}

export default new bookingRepository();
