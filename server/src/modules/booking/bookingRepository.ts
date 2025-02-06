import databaseClient, { type Result } from "../../../database/client";

type Booking = {
  id: number;
  pdc_id: number;
  vehicule_id: number;
  reservation_date: string;
};

class bookingRepository {
  async create(newBooking: Omit<Booking, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO booking (date, vehicle_id, pdc_id) VALUES (?, ?, ?)",
      [newBooking.reservation_date, newBooking.vehicule_id, newBooking.pdc_id],
    );

    return result.insertId;
  }
}

export default new bookingRepository();
