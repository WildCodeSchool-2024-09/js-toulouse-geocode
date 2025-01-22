import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";
import type { CsvDataType } from "../../../types/csvDataType";
import insertDataRepository from "../insertData/insertDataRepository";

type User = {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  sex: string;
  birthday: string;
  postalcode: string;
  hashed_password: string;
  city: string;
};

type Location = Partial<
  Pick<CsvDataType, "region" | "departement" | "ville" | "code_insee">
>;
class UserRepository {
  // The C of CRUD - Create operation

  async create(user: Omit<User, "id">) {
    const location = await this.fetchLocation(user.postalcode);
    const elementLocation: Location = {
      region: location.region,
      departement: location.departement,
      ville: user.city,
      code_insee: user.postalcode,
    };

    const region_id = await insertDataRepository.insertRegion(
      elementLocation as CsvDataType,
    );

    const departement_id = await insertDataRepository.insertDepartement(
      elementLocation as CsvDataType,
      region_id,
    );

    const city_id = await insertDataRepository.insertCity(
      elementLocation as CsvDataType,
      departement_id,
    );

    const postal_code_id = await insertDataRepository.insertPostalCode(
      elementLocation as CsvDataType,
      city_id,
    );

    // Execute the SQL INSERT query to add a new user to the "user" table
    const [result] = await databaseClient.query<Result>(
      `insert into user
      (firstname, lastname, hashed_password, mail, sex, birthday, postal_code_id, number_of_vehicles)
      values
      (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.firstName,
        user.lastName,
        user.hashed_password,
        user.email,
        user.sex,
        this.convertDateFormat(user.birthday),
        postal_code_id,
        0,
      ],
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  async fetchLocation(postalcode: string) {
    let response = await fetch(
      `https://geo.api.gouv.fr/communes?codePostal=${postalcode}&fields=nom,code,codeDepartement,codeRegion`,
    );

    const cityResponseArray = (await response.json()) as Array<{
      nom: string;
      code: string;
      codeDepartement: string;
    }>;

    if (cityResponseArray.length === 0) {
      throw new Error("No city found for this postal code");
    }
    const cityResponse = cityResponseArray[0];

    response = await fetch(
      `https://geo.api.gouv.fr/departements?code=${cityResponse.codeDepartement}&fields=nom,code,codeRegion`,
    );

    const departementResponseArray = (await response.json()) as Array<{
      nom: string;
      code: string;
      codeRegion: string;
    }>;

    if (departementResponseArray.length === 0) {
      throw new Error("No departement found for this city");
    }

    const departementResponse = departementResponseArray[0];
    response = await fetch(
      `https://geo.api.gouv.fr/regions?code=${departementResponse.codeRegion}&fields=nom,code`,
    );

    const regionResponseArray = (await response.json()) as Array<{
      nom: string;
      code: string;
    }>;

    if (regionResponseArray.length === 0) {
      throw new Error("No region found for this departement");
    }

    const regionResponse = regionResponseArray[0];
    return {
      city: cityResponse.nom,
      departement: departementResponse.nom,
      codeDepartement: departementResponse.code,
      region: regionResponse.nom,
      codeRegion: regionResponse.code,
    };
  }

  convertDateFormat(dateString: string) {
    if (!dateString.includes("/")) {
      return dateString;
    }

    // Split the input date string into an array [day, month, year]
    console.info("dateString", dateString);
    const [day, month, year] = dateString.split("/");

    // Format the date to YYYY-mm-dd
    const formattedDate = `${year}-${month}-${day}`;
    console.info("formattedDate", formattedDate);

    return formattedDate;
  }

  async readByEmailWithPassword(email: string) {
    // Execute the SQL SELECT query to retrieve a specific user by its email
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where mail = ?",
      [email],
    );

    // Return the first row of the result, which represents the user
    return rows[0] as User;
  }

  async readUser(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where id = ?",
      [id],
    );

    return rows[0];
  }

  // The R of CRUD - Read operation
}

export default new UserRepository();
