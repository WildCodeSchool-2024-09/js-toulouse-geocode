import type { RequestHandler } from "express";
import stationRepository from "./stationRepository";

// The B of BREAD - Browse (Read All) operation
const browseByGeoLocation: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const items = await stationRepository.readWithGeoLocation(
      req.query.northwestlatitude as string,
      req.query.southeastlatitude as string,
      req.query.northwestlongitude as string,
      req.query.southeastlongitude as string,
    );

    // Respond with the items in JSON format
    res.json(items);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const browse: RequestHandler = async (req, res) => {
  const { limit, offset, search } = req.query;
  try {
    const stations = await stationRepository.readAll(
      Number(limit),
      Number(offset),
      search as string,
    );

    res.json(stations);
  } catch (error) {
    res.status(500).send("Error retrieving stations from database");
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const itemId = Number(req.params.id);
    const item = await stationRepository.read(itemId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (item == null) {
      res.sendStatus(404);
    } else {
      res.json(item);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browseByGeoLocation, read, browse };
