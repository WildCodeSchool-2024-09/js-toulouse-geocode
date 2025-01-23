import type { RequestHandler } from "express";
import geoCoordsRepository from "./geoCoordsRepository";

const read: RequestHandler = async (req, res) => {
  try {
    const geoCoordsId = Number(req.params.id);
    const geoCoords = await geoCoordsRepository.read(geoCoordsId);

    res.json(geoCoords);
  } catch (error) {
    res.status(500).send("Error retrieving geoCoords from database");
  }
};

export default { read };
