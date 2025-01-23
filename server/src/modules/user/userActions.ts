import type { RequestHandler } from "express";
import userRepository from "./userRepository";

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
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
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

    res.sendStatus(200);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { add, verifyEmail };
