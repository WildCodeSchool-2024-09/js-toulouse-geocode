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

export default { browseByGeoLocation };
