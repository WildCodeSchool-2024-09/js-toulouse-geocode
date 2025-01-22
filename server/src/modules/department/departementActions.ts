import type { RequestHandler } from "express";
import departementRepository from "./departementRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const { departement_id } = req.params;

    const departement = await departementRepository.readDepartement(
      Number.parseInt(departement_id),
    );

    if (departement) {
      res.status(200).json(departement);
    } else {
      res.status(404).json({ message: "Departement not found" });
    }
  } catch (error) {
    next(error);
  }
};

export default { browse };
