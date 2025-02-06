import { ne } from "@faker-js/faker/.";
import type { RequestHandler } from "express";
import insertDataRepository from "../insertData/insertDataRepository";
import vehicleRepository from "../vehicle/vehicleRepository";
import userRepository from "./userRepository";

// The B of BREAD - Browse (Read) operation

const browse: RequestHandler = async (req, res, next) => {
  const { limit, offset, search } = req.query;
  try {
    const users = await userRepository.readAll(
      Number(limit),
      Number(offset),
      search as string,
    );

    res.json(users);
  } catch (error) {
    next(error);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id);

    const user = await userRepository.readUser(id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the user data from the request body
    const newUser = {
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      email: req.body.email,
      sex: req.body.sex,
      birthday: req.body.birthday,
      postalcode: req.body.postalcode,
      city: req.body.city,
      hashed_password: req.body.hashed_password,
    };

    // Create the user
    const insertId = await userRepository.create(newUser);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
    res.status(201).json({ insertId });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id);

    await userRepository.delete(id);

    res.send(204);
  } catch (error) {
    next(error);
  }
};

const verifyEmail: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided email
    const user = await userRepository.readByEmailWithPassword(
      req.query.email as string,
    );

    if (user == null) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json(user.id);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

const updateUserInfos: RequestHandler = async (req, res, next) => {
  try {
    const user = {
      id: Number.parseInt(req.params.id),
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      mail: req.body.mail,
      sex: req.body.sex,
      birthday: req.body.birthday,
      postal_code: req.body.postalcode,
      insee_code: req.body.insee_code,
      number_of_vehicle: req.body.number_of_vehicle,
      city: req.body.city,
      departement: req.body.departement,
      region: req.body.region,
    };

    const updatedId = await userRepository.updateProfileInfos(user);
    res.status(200).json({ updatedId });
  } catch (error) {
    next(error);
  }
};

const updatePassword: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { hashed_password } = req.body;

    const updatedId = await userRepository.updatePassword(
      Number.parseInt(id),
      hashed_password,
    );
    res.status(204).json({ updatedId });
  } catch (error) {
    next(error);
  }
};

export default {
  browse,
  read,
  add,
  verifyEmail,
  updateUserInfos,
  updatePassword,
  destroy,
};
