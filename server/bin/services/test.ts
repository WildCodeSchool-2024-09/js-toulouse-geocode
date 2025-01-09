import type { CsvDataType } from "../../types/csvDataType";
import { convertCsvToJson } from "./csvManagement";
import { insertData } from "./insertData";

const test = async (csvFile: File) => {
  try {
    console.time("Timer");
    console.info("Début du traitement du fichier CSV...");
    const data = (await convertCsvToJson(csvFile)) as CsvDataType[];
    console.info(`${data.length} lignes trouvées dans le CSV`);

    await insertData(data);
    console.info("Données insérées avec succès");
    console.timeEnd("Timer");
    process.exit(0);
  } catch (error) {
    console.error("Erreur lors du traitement:", error);
  }
};

export { test };
