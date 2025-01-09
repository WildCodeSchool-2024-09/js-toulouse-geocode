import type { Result, Rows } from "../../database/client";
import databaseClient from "../../database/client";
import type { CsvDataType } from "../../types/csvDataType";
import { correctionData } from "./csvManagement";

const insertRegion = async (elem: CsvDataType) => {
  try {
    const [row] = await databaseClient.query<Rows>(
      "SELECT * FROM region WHERE name = ?",
      [elem.region],
    );

    if (row[0]) return row[0].id;

    const [result] = await databaseClient.query<Result>(
      "INSERT INTO region (name) VALUES (?)",
      [elem.region],
    );
    return result.insertId;
  } catch (error) {
    console.error(error);
  }
};

const insertDepartement = async (elem: CsvDataType, regionId: number) => {
  try {
    const [row] = await databaseClient.query<Rows>(
      "SELECT * FROM department WHERE name = ?",
      [elem.departement],
    );

    if (row[0]) return row[0].id;

    const [result] = await databaseClient.query<Result>(
      "INSERT INTO department (name, region_id) VALUES (?, ?)",
      [elem.departement, regionId],
    );
    return result.insertId;
  } catch (error) {
    console.error(error);
  }
};

const insertCity = async (elem: CsvDataType, departmentId: number) => {
  try {
    const [row] = await databaseClient.query<Rows>(
      "SELECT * FROM city WHERE name = ?",
      [elem.code_insee_commune],
    );

    if (row[0]) return row[0].id;

    const [result] = await databaseClient.query<Result>(
      "INSERT INTO city (name, department_id) VALUES (?, ?)",
      [elem.code_insee_commune, departmentId],
    );
    return result.insertId;
  } catch (error) {
    console.error(error);
  }
};

const insertPotalcode = async (elem: CsvDataType, cityId: number) => {
  try {
    const [row] = await databaseClient.query<Rows>(
      "SELECT * FROM postalcode WHERE code = ?",
      [elem.code_insee],
    );

    if (row[0]) return row[0].id;

    const [result] = await databaseClient.query<Result>(
      "INSERT INTO postalcode (code, city_id) VALUES (?, ?)",
      [elem.code_insee, cityId],
    );
    return result.insertId;
  } catch (error) {
    console.error(error);
  }
};

const insertSign = async (elem: CsvDataType) => {
  try {
    const [row] = await databaseClient.query<Rows>(
      "SELECT * FROM sign WHERE name = ?",
      [elem.n_enseigne],
    );

    if (row[0]) return row[0].id;

    const [result] = await databaseClient.query<Result>(
      "INSERT INTO sign (name) VALUES (?)",
      [elem.n_enseigne],
    );
    return result.insertId;
  } catch (error) {
    console.error(error);
  }
};

const insertOperator = async (elem: CsvDataType) => {
  try {
    const [row] = await databaseClient.query<Rows>(
      "SELECT * FROM operator WHERE name = ?",
      [elem.n_operateur],
    );

    if (row[0]) return row[0].id;

    const [result] = await databaseClient.query<Result>(
      "INSERT INTO operator (name) VALUES (?)",
      [elem.n_operateur],
    );
    return result.insertId;
  } catch (error) {
    console.error(error);
  }
};

const insertProvider = async (elem: CsvDataType) => {
  try {
    const [row] = await databaseClient.query<Rows>(
      "SELECT * FROM provider WHERE name = ?",
      [elem.n_amenageur],
    );

    if (row[0]) return row[0].id;

    const [result] = await databaseClient.query<Result>(
      "INSERT INTO provider (name) VALUES (?)",
      [elem.n_amenageur],
    );

    return result.insertId;
  } catch (error) {
    console.error(error);
  }
};

const insertGeoCoords = async (elem: CsvDataType) => {
  try {
    const [row] = await databaseClient.query<Rows>(
      "SELECT * FROM geo_coords WHERE latitude = ? AND longitude = ?",
      [elem.ylatitude, elem.xlongitude],
    );

    if (row[0]) return row[0].id;

    const [result] = await databaseClient.query<Result>(
      "INSERT INTO geo_coords (latitude, longitude) VALUES (?, ?)",
      [elem.ylatitude, elem.xlongitude],
    );
    return result.insertId;
  } catch (error) {
    console.error(error);
  }
};

const insertPdc = async (elem: CsvDataType) => {
  try {
    const [row] = await databaseClient.query<Rows>(
      "SELECT * FROM pdc WHERE name = ?",
      [elem.id_pdc],
    );

    if (row[0]) return row[0].id;

    const [result] = await databaseClient.query<Result>(
      "INSERT INTO pdc (name, power_max, type) VALUES (?, ?, ?)",
      [elem.id_pdc, elem.puiss_max, elem.type_prise],
    );
    return result.insertId;
  } catch (error) {
    console.error(error);
  }
};

const insertStation = async (
  elem: CsvDataType,
  signId: number,
  operatorId: number,
  providerId: number,
  postalcodeId: number,
  geoCoordsId: number,
  pdcId: number,
) => {
  try {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO station (name, address, sign_id, operator_id, provider_id, postalcode_id, geo_coords_id, number_pdc, pdc_id, access_charging, accessibility, update_date_time, source) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        elem.n_station,
        elem.ad_station,
        signId,
        operatorId,
        providerId,
        postalcodeId,
        geoCoordsId,
        elem.nbre_pdc,
        pdcId,
        elem.acces_recharge,
        elem.accessibilite,
        elem.date_maj,
        elem.source,
      ],
    );
    return result.insertId;
  } catch (error) {
    console.error(error);
  }
};

const insertData = async (data: CsvDataType[]) => {
  let count = 1;
  try {
    for (const elem of data) {
      count++;
      console.info(`${count} / ${data.length}`);
      if (elem.geo_point_borne === "") continue;
      const correctData = await correctionData(elem);
      const regionId = await insertRegion(correctData);
      const departmentId = await insertDepartement(correctData, regionId);
      const cityId = await insertCity(correctData, departmentId);
      const postalcodeId = await insertPotalcode(correctData, cityId);
      const signId = await insertSign(correctData);
      const operatorId = await insertOperator(correctData);
      const providerId = await insertProvider(correctData);
      const geoCoordsId = await insertGeoCoords(correctData);
      const pdcId = await insertPdc(correctData);

      const idStation = await insertStation(
        correctData,
        signId,
        operatorId,
        providerId,
        postalcodeId,
        geoCoordsId,
        pdcId,
      );
    }
  } catch (error) {
    console.error(error);
  }
};

export { insertData };
