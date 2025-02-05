import type { RequestHandler } from "express";
import outletRepository from "./outletRepository";

const read: RequestHandler = async (req, res) => {
  try {
    const pdcId = Number(req.params.id);
    const pdc = await outletRepository.read(pdcId);

    res.json(pdc);
  } catch (error) {
    res.status(500).send("Error retrieving pdc from database");
  }
};

const readAllByStation: RequestHandler = async (req, res) => {
  try {
    const pdcId = Number(req.params.id);
    const pdc = await outletRepository.readAllByStation(pdcId);

    res.json(pdc);
  } catch (error) {
    res.status(500).send("Error retrieving pdc from database");
  }
};
export default { read, readAllByStation };
