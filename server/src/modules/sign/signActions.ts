import type { RequestHandler } from "express";
import signRepository from "./signRepository";

const read: RequestHandler = async (req, res) => {
  try {
    const signId = Number(req.params.id);
    const sign = await signRepository.read(signId);

    res.json(sign);
  } catch (error) {
    res.status(500).send("Error retrieving sign from database");
  }
};

export default { read };
