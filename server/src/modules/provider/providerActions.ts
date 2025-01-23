import type { RequestHandler } from "express";
import providerRepository from "./providerRepository";

const read: RequestHandler = async (req, res) => {
  try {
    const providerId = Number(req.params.id);
    const provider = await providerRepository.read(providerId);

    res.json(provider);
  } catch (error) {
    res.status(500).send("Error retrieving provider from database");
  }
};

export default { read };
