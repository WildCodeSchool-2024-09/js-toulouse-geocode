import type { RequestHandler } from "express";
import codeInseeRepository from "./codeInseeRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id);

    const insee_code = await codeInseeRepository.readInseeCode(id);

    if (insee_code) {
      res.status(200).json(insee_code);
    } else {
      res.status(404).json({ message: "Insee code not found" });
    }
  } catch (error) {
    next(error);
  }
};

export default { read };
