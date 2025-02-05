import type { RequestHandler } from "express";
import userRepository from "../user/userRepository";
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

const readByUserId: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const vehicles = await vehicleRepository.readAllByUser(Number.parseInt(id));

    res.json(vehicles);
  } catch (error) {
    res.status(500).send("Error retrieving vehicles from database");
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

    await userRepository.updateNumberOfVehicles(user_id, "+");

    res.status(201).json({ insertId });
  } catch (error) {
    next(error);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id);
    const { user_id } = req.body;

    await vehicleRepository.delete(id);
    await userRepository.updateNumberOfVehicles(user_id, " - ");

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default {
  browse,
  readByUserId,
  add,
  read,
  updateVehicleInfos,
  destroy,
};
