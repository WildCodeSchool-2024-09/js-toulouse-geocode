import type { RequestHandler } from "express";
import operatorRepository from "./operatorRepository";

const read: RequestHandler = async (req, res) => {
  try {
    const operatorId = Number(req.params.id);
    const operator = await operatorRepository.read(operatorId);

    res.json(operator);
  } catch (error) {
    res.status(500).send("Error retrieving operator from database");
  }
};

export default { read };
