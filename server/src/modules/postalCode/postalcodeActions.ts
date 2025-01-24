import type { RequestHandler } from "express";
import postalcodeRepository from "./postalcodeRepository";

const read: RequestHandler = async (req, res) => {
  try {
    const postalcodeId = Number(req.params.id);
    const postalcode = await postalcodeRepository.read(postalcodeId);

    res.json(postalcode);
  } catch (error) {
    res.status(500).send("Error retrieving postalcode from database");
  }
};

export default { read };
