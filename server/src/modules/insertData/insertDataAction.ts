import type { RequestHandler } from "express";
import { UploadedFile } from "express-fileupload";
import { convertCsvToJson } from "../../../bin/services/csvManagement";
import type { CsvDataType } from "../../../types/csvDataType";
import insertDataRepository from "./insertDataRepository";

const addStations: RequestHandler = async (req, res) => {
  try {
    const files = req.files;
    if (!files || !files.file) {
      res.status(400).json({ error: `Aucun fichier reçu: ${files}` });
      return;
    }

    // Type guard to handle both single file and array cases
    const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;

    const csvContent = uploadedFile.data.toString("utf-8");

    const data = (await convertCsvToJson(csvContent)) as CsvDataType[];
    console.info(`${data.length} lignes trouvées dans le CSV`);

    await insertDataRepository.createStationsFromCsvData(data);

    res
      .status(200)
      .json({ message: "Fichier reçu avec succès", content: files });
  } catch (error) {
    // Improved error handling
    console.error("Error processing file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default { create: addStations };
