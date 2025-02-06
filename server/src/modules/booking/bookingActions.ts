import type { RequestHandler } from "express";
import bookingRepository from "./bookingRepository";

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

export default { add };
