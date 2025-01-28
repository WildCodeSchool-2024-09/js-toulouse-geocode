import type { RequestHandler } from "express";
import vehicleRepository from "./vehicleRepository";

const browse: RequestHandler = async (req, res) => {
  const { limit, offset, search } = req.query;
  try {
    const users = await vehicleRepository.readAll(
      Number(limit),
      Number(offset),
      search as string,
    );

    res.json(users);
  } catch (error) {
    res.status(500).send("Error retrieving stations from database");
  }
};

export default { browse };
