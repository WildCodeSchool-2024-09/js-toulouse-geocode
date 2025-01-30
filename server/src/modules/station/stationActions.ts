import type { RequestHandler } from "express";
import type { StationProps } from "../../../common/types/StationProps";
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

const fetchLocation = async (city: string) => {
  const response = await fetch(
    `https://geo.api.gouv.fr/communes?nom=${city}&fields=nom,code,departement,region`,
  );

  const cityResponseArray = await response.json();

  if (cityResponseArray.length === 0) {
    throw new Error("No city found for this postal code");
  }

  return {
    city: cityResponseArray[0].nom,
    inseecode: cityResponseArray[0].code,
    departement: cityResponseArray[0].departement.nom,
    codeDepartement: cityResponseArray[0].departement.code,
    region: cityResponseArray[0].region.nom,
    codeRegion: cityResponseArray[0].region.code,
  };
};

const updateStationInfos: RequestHandler = async (req, res, next) => {
  try {
    const area = await fetchLocation(req.body.city);
    const currentDateTime = new Date();
    const currentDateTimeString = `${currentDateTime.getFullYear().toString().padStart(4, "0")}-${(currentDateTime.getMonth() + 1).toString().padStart(2, "0")}-${currentDateTime.getDate().toString().padStart(2, "0")} ${currentDateTime.getHours().toString().padStart(2, "0")}:${currentDateTime.getMinutes().toString().padStart(2, "0")}:${currentDateTime.getSeconds().toString().padStart(2, "0")}`;
    currentDateTimeString.replaceAll("\\n", "");
    currentDateTimeString.replaceAll("\n", "");

    const response = await fetch(
      `https://geo.api.gouv.fr/communes?codePostal=${req.body.postal_code}&nom=${req.body.city}&fields=nom,code,departement,region`,
    );
    if (!response.ok) {
      throw new Error(
        "Veuillez entrer une ville valide en fonction du code postal.",
      );
    }

    const dataReceived = await response.json();
    if (dataReceived.length === 0) {
      throw new Error(
        "Veuillez entrer une ville valide en fonction du code postal.",
      );
    }

    const insee_code = dataReceived[0].code;
    const department = dataReceived[0].departement.nom;
    const region = dataReceived[0].region.nom;

    const station: StationProps = {
      id: Number(req.params.id),
      name: req.body.station_name,
      address: req.body.address,
      sign_name: req.body.sign_name,
      operator_name: req.body.operator_name,
      provider_name: req.body.provider_name,
      area: {
        postalcode: req.body.postal_code,
        city_name: req.body.city,
        department_name: department,
        region_name: region,
      },
      geo_coords: {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      },
      number_pdc: req.body.number_of_pdcs,
      pdc: {
        name: req.body.station_identifier,
        power_max: req.body.pdc_power_max,
        type: req.body.pdc_type,
      },
      access_charging: req.body.access_charging,
      accessibility: req.body.accessibility,
      update_date_time: currentDateTimeString,
      source: req.body.source,
    };
    const itemId = Number(req.params.id);
    const updatedItem = req.body;
    await stationRepository.updateStationInfos(station, insee_code);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const itemId = Number(req.params.id);
    await stationRepository.delete(itemId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default {
  browseByGeoLocation,
  read,
  browse,
  updateStationInfos,
  destroy,
};
