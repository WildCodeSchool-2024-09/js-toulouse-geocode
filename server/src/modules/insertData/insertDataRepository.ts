import {
  type ExtendedCsvDataType,
  correctionData,
} from "../../../bin/services/csvManagement";
import type { Result, Rows } from "../../../database/client";
import databaseClient from "../../../database/client";
import type { CsvDataType } from "../../../types/csvDataType";
import { eventEmitter } from "../webSocket/webSocketActions";

class InsertDataRepository {
  async insertRegion(elem: CsvDataType) {
    return await this.insertRegionUsingName(elem.region);
  }

  async insertRegionUsingName(region: string) {
    try {
      const [row] = await databaseClient.query<Rows>(
        "SELECT * FROM region WHERE name = ?",
        [region],
      );

      if (row[0]) return row[0].id;

      const [result] = await databaseClient.query<Result>(
        "INSERT INTO region (name) VALUES (?)",
        [region],
      );
      return result.insertId;
    } catch (error) {
      console.error(error);
    }
  }
  async insertDepartement(elem: CsvDataType, regionId: number) {
    return await this.insertDepartementUsingName(elem.departement, regionId);
  }

  async insertDepartementUsingName(department: string, regionId: number) {
    try {
      const [row] = await databaseClient.query<Rows>(
        "SELECT * FROM department WHERE name = ?",
        [department],
      );

      if (row[0]) return row[0].id;

      const [result] = await databaseClient.query<Result>(
        "INSERT INTO department (name, region_id) VALUES (?, ?)",
        [department, regionId],
      );
      return result.insertId;
    } catch (error) {
      console.error(error);
    }
  }

  async insertCity(elem: CsvDataType, departmentId: number) {
    return await this.insertCityUsingName(elem.ville, departmentId);
  }

  async insertCityUsingName(city: string, departmentId: number) {
    try {
      const [row] = await databaseClient.query<Rows>(
        "SELECT * FROM city WHERE name = ?",
        [city],
      );

      if (row[0]) return row[0].id;

      const [result] = await databaseClient.query<Result>(
        "INSERT INTO city (name, department_id) VALUES (?, ?)",
        [city, departmentId],
      );
      return result.insertId;
    } catch (error) {
      console.error(error);
    }
  }

  async insertPostalCode(elem: ExtendedCsvDataType) {
    return await this.insertPostalCodeUsingName(elem.code_postal);
  }

  async insertPostalCodeUsingName(postalcode: string) {
    try {
      const [row] = await databaseClient.query<Rows>(
        "SELECT * FROM postalcode WHERE code = ?",
        [postalcode],
      );

      if (row[0]) return row[0].id;

      const [result] = await databaseClient.query<Result>(
        "INSERT INTO postalcode (code) VALUES (?)",
        [postalcode],
      );
      return result.insertId;
    } catch (error) {
      console.error(error);
    }
  }

  async insertInseeCode(elem: ExtendedCsvDataType, cityId: number) {
    return await this.insertInseeCodeUsingName(elem.code_insee_commune, cityId);
  }

  async insertInseeCodeUsingName(insee_code: string, cityId: number) {
    try {
      const [row] = await databaseClient.query<Rows>(
        "SELECT * FROM insee_code WHERE code = ?",
        [insee_code],
      );

      if (row[0]) return row[0].id;

      const [result] = await databaseClient.query<Result>(
        "INSERT INTO insee_code (code, city_id) VALUES (?, ?)",
        [insee_code, cityId],
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
    return await this.insertSignUsingName(elem.n_enseigne);
  }
  async insertSignUsingName(sign: string) {
    try {
      const [row] = await databaseClient.query<Rows>(
        "SELECT * FROM sign WHERE name = ?",
        [sign],
      );

      if (row[0]) return row[0].id;

      const [result] = await databaseClient.query<Result>(
        "INSERT INTO sign (name) VALUES (?)",
        [sign],
      );
      return result.insertId;
    } catch (error) {
      console.error(error);
    }
  }

  async insertOperator(elem: CsvDataType) {
    return await this.insertOperatorUsingName(elem.n_operateur);
  }
  async insertOperatorUsingName(operator: string) {
    try {
      const [row] = await databaseClient.query<Rows>(
        "SELECT * FROM operator WHERE name = ?",
        [operator],
      );

      if (row[0]) return row[0].id;

      const [result] = await databaseClient.query<Result>(
        "INSERT INTO operator (name) VALUES (?)",
        [operator],
      );
      return result.insertId;
    } catch (error) {
      console.error(error);
    }
  }

  async insertProvider(elem: CsvDataType) {
    return await this.insertProviderUsingName(elem.n_amenageur);
  }
  async insertProviderUsingName(provider: string) {
    try {
      const [row] = await databaseClient.query<Rows>(
        "SELECT * FROM provider WHERE name = ?",
        [provider],
      );

      if (row[0]) return row[0].id;

      const [result] = await databaseClient.query<Result>(
        "INSERT INTO provider (name) VALUES (?)",
        [provider],
      );

      return result.insertId;
    } catch (error) {
      console.error(error);
    }
  }

  async insertGeoCoords(elem: CsvDataType) {
    return await this.insertGeoCoordsUsingCoords(
      elem.ylatitude,
      elem.xlongitude,
    );
  }
  async insertGeoCoordsUsingCoords(latitude: string, longitude: string) {
    try {
      const [row] = await databaseClient.query<Rows>(
        "SELECT * FROM geo_coords WHERE latitude = ? AND longitude = ?",
        [latitude, longitude],
      );

      if (row[0]) return row[0].id;

      const [result] = await databaseClient.query<Result>(
        "INSERT INTO geo_coords (latitude, longitude) VALUES (?, ?)",
        [latitude, longitude],
      );
      return result.insertId;
    } catch (error) {
      console.error(error);
    }
  }

  async insertPdc(elem: CsvDataType) {
    return await this.insertPdcUsingElements(
      elem.id_pdc,
      elem.puiss_max,
      elem.type_prise,
    );
  }

  async insertPdcUsingElements(
    pdc_id: string,
    puiss_max: string,
    pdc_type: string,
  ) {
    try {
      const [row] = await databaseClient.query<Rows>(
        "SELECT * FROM pdc WHERE name = ?",
        [pdc_id],
      );

      if (row[0]) return row[0].id;

      const [result] = await databaseClient.query<Result>(
        "INSERT INTO pdc (name, power_max, type) VALUES (?, ?, ?)",
        [pdc_id, puiss_max, pdc_type],
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
    return await this.insertStationWithElements(
      elem.n_station,
      elem.ad_station,
      elem.id_station,
      elem.nbre_pdc,
      elem.acces_recharge,
      elem.accessibilite,
      elem.date_maj,
      elem.source,
      signId,
      operatorId,
      providerId,
      inseeCodeId,
      postalcodeId,
      geoCoordsId,
      pdcId,
    );
  }

  async insertStationWithElements(
    name: string,
    address: string,
    identifier: string,
    number_of_pdcs: string,
    access_charging: string,
    accessibility: string,
    update_date_time: string,
    source: string,
    signId: number,
    operatorId: number,
    providerId: number,
    inseeCodeId: number,
    postalcodeId: number,
    geoCoordsId: number,
    pdcId: number,
  ) {
    try {
      let station_id: number;

      const [row] = await databaseClient.query<Rows>(
        "SELECT * FROM station WHERE identifier = ?",
        [identifier],
      );

      if (row.length > 0) {
        station_id = row[0].id;
        const [result] = await databaseClient.query<Result>(
          "UPDATE station SET name = ?, address = ?, identifier = ?, sign_id = ?, operator_id = ?, provider_id = ?, postalcode_id = ?, insee_code_id = ?, geo_coords_id = ?, number_pdc = ?, access_charging = ?, accessibility = ?, update_date_time = ?, source = ? WHERE id = ?",
          [
            name,
            address,
            identifier,
            signId,
            operatorId,
            providerId,
            postalcodeId,
            inseeCodeId,
            geoCoordsId,
            number_of_pdcs,
            access_charging,
            accessibility,
            update_date_time,
            source,
            station_id,
          ],
        );
        station_id = result.insertId;
      } else {
        const [result] = await databaseClient.query<Result>(
          "INSERT INTO station (name, address, identifier, sign_id, operator_id, provider_id, postalcode_id, insee_code_id, geo_coords_id, number_pdc, access_charging, accessibility, update_date_time, source) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            name,
            address,
            identifier,
            signId,
            operatorId,
            providerId,
            postalcodeId,
            inseeCodeId,
            geoCoordsId,
            number_of_pdcs,
            access_charging,
            accessibility,
            update_date_time,
            source,
          ],
        );
        station_id = result.insertId;
      }

      await databaseClient.query<Result>(
        "update pdc set station_id = ? where id = ?",
        [station_id, pdcId],
      );

      return station_id;
    } catch (error) {
      console.error(error);
    }
  }

  async createStationsFromCsvData(data: CsvDataType[]) {
    let count = 1;
    try {
      for (const elem of data) {
        count++;
        eventEmitter.emit(
          "update",
          JSON.stringify({ value: count, max: data.length }),
        );
        if (elem.geo_point_borne === "") continue;
        const correctData = await correctionData(elem);

        if (
          !correctData ||
          !correctData.ville ||
          !correctData.departement ||
          !correctData.region
        )
          continue;

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
      const [inseeRow] = await databaseClient.query<Rows>(
        "SELECT * FROM insee_code WHERE code = ?",
        [inseeCode],
      );

      if (inseeRow[0]) {
        return inseeRow[0].id;
      }

      const [cityRow] = await databaseClient.query<Rows>(
        "SELECT * FROM city WHERE name = ?",
        [city],
      );

      let cityId: number;

      if (cityRow[0]) {
        cityId = cityRow[0].id;
      } else {
        const [departmentRow] = await databaseClient.query<Rows>(
          "SELECT * FROM department WHERE name = ?",
          [department],
        );

        let departmentId: number;

        if (departmentRow[0]) {
          departmentId = departmentRow[0].id;
        } else {
          const [regionRow] = await databaseClient.query<Rows>(
            "SELECT * FROM region WHERE name = ?",
            [region],
          );

          let regionId: number;

          if (regionRow[0]) {
            regionId = regionRow[0].id;
          } else {
            const [regionResult] = await databaseClient.query<Result>(
              "INSERT INTO region (name) VALUES (?)",
              [region],
            );
            regionId = regionResult.insertId;
          }

          const [departmentResult] = await databaseClient.query<Result>(
            "INSERT INTO department (name, region_id) VALUES (?, ?)",
            [department, regionId],
          );
          departmentId = departmentResult.insertId;
        }

        const [cityResult] = await databaseClient.query<Result>(
          "INSERT INTO city (name, department_id) VALUES (?, ?)",
          [city, departmentId],
        );
        cityId = cityResult.insertId;
      }

      const [inseeResult] = await databaseClient.query<Result>(
        "INSERT INTO insee_code (code, city_id) VALUES (?, ?)",
        [inseeCode, cityId],
      );

      return inseeResult.insertId;
    } catch (error) {
      console.error("Erreur dans insertLocationFromInseeCode :", error);
      throw error;
    }
  }
}

export default new InsertDataRepository();
