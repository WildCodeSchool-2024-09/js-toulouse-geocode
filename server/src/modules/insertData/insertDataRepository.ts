import {
  type ExtendedCsvDataType,
  correctionData,
} from "../../../bin/services/csvManagement";
import type { Result, Rows } from "../../../database/client";
import databaseClient from "../../../database/client";
import type { CsvDataType } from "../../../types/csvDataType";

class InsertDataRepository {
  async insertRegion(elem: CsvDataType) {
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
  }

  async insertDepartement(elem: CsvDataType, regionId: number) {
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
  }

  async insertCity(elem: CsvDataType, departmentId: number) {
    try {
      const [row] = await databaseClient.query<Rows>(
        "SELECT * FROM city WHERE name = ?",
        [elem.ville],
      );

      if (row[0]) return row[0].id;

      const [result] = await databaseClient.query<Result>(
        "INSERT INTO city (name, department_id) VALUES (?, ?)",
        [elem.ville, departmentId],
      );
      return result.insertId;
    } catch (error) {
      console.error(error);
    }
  }

  async insertPostalCode(elem: ExtendedCsvDataType) {
    try {
      const [row] = await databaseClient.query<Rows>(
        "SELECT * FROM postalcode WHERE code = ?",
        [elem.code_postal],
      );

      if (row[0]) return row[0].id;

      const [result] = await databaseClient.query<Result>(
        "INSERT INTO postalcode (code) VALUES (?)",
        [elem.code_postal],
      );
      return result.insertId;
    } catch (error) {
      console.error(error);
    }
  }

  async insertInseeCode(elem: ExtendedCsvDataType, cityId: number) {
    try {
      const [row] = await databaseClient.query<Rows>(
        "SELECT * FROM insee_code WHERE code = ?",
        [elem.code_insee_commune],
      );

      if (row[0]) return row[0].id;

      const [result] = await databaseClient.query<Result>(
        "INSERT INTO insee_code (code, city_id) VALUES (?, ?)",
        [elem.code_insee_commune, cityId],
      );
      return result.insertId;
    } catch (error) {
      console.error(error);
    }
  }

  async verifyPostalCode(postalCode: number) {
    try {
      const [row] = await databaseClient.query<Rows>(
        "SELECT * FROM postalcode WHERE code = ?",
        [postalCode],
      );

      if (row[0]) return row[0].id;

      const [result] = await databaseClient.query<Result>(
        "INSERT INTO postalcode (code) VALUES (?)",
        [postalCode],
      );
      return result.insertId;
    } catch (error) {
      console.error(error);
    }
  }

  async verifyInseeCode(inseeCode: number) {}

  async insertSign(elem: CsvDataType) {
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
  }

  async insertOperator(elem: CsvDataType) {
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
  }

  async insertProvider(elem: CsvDataType) {
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
  }

  async insertGeoCoords(elem: CsvDataType) {
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
  }

  async insertPdc(elem: CsvDataType) {
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
  }

  async insertStation(
    elem: CsvDataType,
    signId: number,
    operatorId: number,
    providerId: number,
    inseeCodeId: number,
    postalcodeId: number,
    geoCoordsId: number,
    pdcId: number,
  ) {
    try {
      const [result] = await databaseClient.query<Result>(
        "INSERT INTO station (name, address, sign_id, operator_id, provider_id, postalcode_id, insee_code_id, geo_coords_id, number_pdc, pdc_id, access_charging, accessibility, update_date_time, source) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          elem.n_station,
          elem.ad_station,
          signId,
          operatorId,
          providerId,
          postalcodeId,
          inseeCodeId,
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
  }

  async createStationsFromCsvData(data: CsvDataType[]) {
    let count = 1;
    try {
      for (const elem of data) {
        count++;
        console.info(`${count} / ${data.length}`);
        if (elem.geo_point_borne === "") continue;
        const correctData = await correctionData(elem);
        const regionId = await this.insertRegion(correctData);
        const departmentId = await this.insertDepartement(
          correctData,
          regionId,
        );
        const cityId = await this.insertCity(correctData, departmentId);
        const postalcodeId = await this.insertPostalCode(correctData);
        const inseeCodeId = await this.insertInseeCode(correctData, cityId);
        const signId = await this.insertSign(correctData);
        const operatorId = await this.insertOperator(correctData);
        const providerId = await this.insertProvider(correctData);
        const geoCoordsId = await this.insertGeoCoords(correctData);
        const pdcId = await this.insertPdc(correctData);

        await this.insertStation(
          correctData,
          signId,
          operatorId,
          providerId,
          inseeCodeId,
          postalcodeId,
          geoCoordsId,
          pdcId,
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  async insertLocationFromInseeCode(
    inseeCode: number,
    city: string,
    department: string,
    region: string,
  ) {
    try {
      // console.log(inseeCode, city, department, region); // Removed for linter compliance
      console.info(inseeCode, city, department, region); // Use console.info for debugging information

      // 1. Vérifier si le code INSEE existe déjà
      const [inseeRow] = await databaseClient.query<Rows>(
        "SELECT * FROM insee_code WHERE code = ?",
        [inseeCode],
      );

      if (inseeRow[0]) {
        console.info(
          `Code INSEE ${inseeCode} déjà existant avec l'id ${inseeRow[0].id}.`,
        );
        return inseeRow[0].id;
      }

      // 2. Vérifier si la ville existe déjà
      const [cityRow] = await databaseClient.query<Rows>(
        "SELECT * FROM city WHERE name = ?",
        [city],
      );

      let cityId: number;

      if (cityRow[0]) {
        cityId = cityRow[0].id;
        console.info(`Ville "${city}" déjà existante avec l'id ${cityId}.`);
      } else {
        // 3. Vérifier si le département existe déjà
        const [departmentRow] = await databaseClient.query<Rows>(
          "SELECT * FROM department WHERE name = ?",
          [department],
        );

        let departmentId: number;

        if (departmentRow[0]) {
          departmentId = departmentRow[0].id;
          // console.log(`Département "${department}" déjà existant avec l'id ${departmentId}.`); // Removed for linter compliance
          console.info(
            `Département "${department}" déjà existant avec l'id ${departmentId}.`,
          ); // Use console.info for debugging information
        } else {
          // 4. Vérifier si la région existe déjà
          const [regionRow] = await databaseClient.query<Rows>(
            "SELECT * FROM region WHERE name = ?",
            [region],
          );

          let regionId: number;

          if (regionRow[0]) {
            regionId = regionRow[0].id;
            // console.log(`Région "${region}" déjà existante avec l'id ${regionId}.`); // Removed for linter compliance
            console.info(
              `Région "${region}" déjà existante avec l'id ${regionId}.`,
            ); // Use console.info for debugging information
          } else {
            // Insérer une nouvelle région
            const [regionResult] = await databaseClient.query<Result>(
              "INSERT INTO region (name) VALUES (?)",
              [region],
            );
            regionId = regionResult.insertId;
            // console.log(`Région "${region}" insérée avec l'id ${regionId}.`); // Removed for linter compliance
            console.info(`Région "${region}" insérée avec l'id ${regionId}.`); // Use console.info for debugging information
          }

          // Insérer un nouveau département
          const [departmentResult] = await databaseClient.query<Result>(
            "INSERT INTO department (name, region_id) VALUES (?, ?)",
            [department, regionId],
          );
          departmentId = departmentResult.insertId;
          // console.log(`Département "${department}" inséré avec l'id ${departmentId}.`); // Removed for linter compliance
          console.info(
            `Département "${department}" inséré avec l'id ${departmentId}.`,
          ); // Use console.info for debugging information
        }

        // Insérer une nouvelle ville
        const [cityResult] = await databaseClient.query<Result>(
          "INSERT INTO city (name, department_id) VALUES (?, ?)",
          [city, departmentId],
        );
        cityId = cityResult.insertId;
        console.info(`Ville "${city}" insérée avec l'id ${cityId}.`);
      }

      // 5. Insérer le code INSEE avec l'id de la ville
      const [inseeResult] = await databaseClient.query<Result>(
        "INSERT INTO insee_code (code, city_id) VALUES (?, ?)",
        [inseeCode, cityId],
      );
      console.info(
        `Code INSEE ${inseeCode} inséré avec l'id ${inseeResult.insertId}.`,
      );

      return inseeResult.insertId;
    } catch (error) {
      console.error("Erreur dans insertLocationFromInseeCode :", error);
      throw error;
    }
  }
}

export default new InsertDataRepository();
