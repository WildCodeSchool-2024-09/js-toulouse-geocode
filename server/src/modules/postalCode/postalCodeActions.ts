import type { RequestHandler } from "express";
import departementRepository from "../department/departementRepository";
import postalCodeRepository from "./postalCodeRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const postal_code = await postalCodeRepository.readPostalCode(id);

    if (postal_code) {
      res.status(200).json(postal_code);
    } else {
      res.status(404).json({ message: "Postal code not found" });
    }
  } catch (error) {
    next(error);
  }
};

export default { read };
