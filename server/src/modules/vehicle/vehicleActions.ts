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

const read: RequestHandler = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id);

    const vehicle = await vehicleRepository.read(id);

    res.json(vehicle);
  } catch (error) {
    next(error);
  }
};

const updateVehicleInfos: RequestHandler = async (req, res, next) => {
  try {
    const vehicle = {
      id: Number.parseInt(req.params.id),
      model: req.body.model_name,
      brand: req.body.brand_name,
      type: req.body.type_name,
      user_id: req.body.user_id,
    };

    await vehicleRepository.updateVehicleInfos(vehicle);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { brand, model, type, user_id } = req.body;

    const insertId = await vehicleRepository.create(
      brand,
      model,
      type,
      user_id,
    );

    res.status(201).json({ insertId });
  } catch (error) {
    next(error);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id);

    await vehicleRepository.delete(id);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default { browse, add, read, updateVehicleInfos, destroy };
