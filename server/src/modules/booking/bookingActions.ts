import type { RequestHandler } from "express";
import bookingRepository from "./bookingRepository";

const readAllByUser: RequestHandler = async (req, res, next) => {
  try {
    const itemId = Number(req.params.id);
    const bookings = await bookingRepository.readAllByUser(itemId);

    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newBooking = {
      pdc_id: req.body.pdc_id,
      vehicule_id: req.body.vehicule_id,
      reservation_date: req.body.reservation_date,
    };

    const insertId = await bookingRepository.create(newBooking);

    res.status(201).json({ insertId });
  } catch (error) {
    next(error);
  }
};

export default { add, readAllByUser };
