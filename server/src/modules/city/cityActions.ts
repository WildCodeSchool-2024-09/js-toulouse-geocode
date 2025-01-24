import type { RequestHandler } from "express";
import cityRepository from "./cityRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const city = await cityRepository.readCity(id);

    if (city) {
      res.status(200).json(city);
    } else {
      res.status(404).json({ message: "City not found" });
    }
  } catch (error) {
    next(error);
  }
};

export default { read };
