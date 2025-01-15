import type { RequestHandler } from "express";
import contactRepository from "./contactRepository";

function isEmailAddress(value: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(value);
}

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const newItem = {
      ask_type: req.body.ask_type,
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    };

    // Create the item
    const insertId = await contactRepository.create(newItem);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  try {
    if (!isEmailAddress(req.body.email)) {
      // Respond with HTTP 422 (Unprocessable Entity) and the error message
      res.send(422).json({ error: "Invalid email address" });
      return;
    }

    next();
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { add, validate };
