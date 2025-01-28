import type { ExtendedCsvDataType } from "../../../bin/services/csvManagement";
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
  city: string;
  hashed_password: string;
};

type UserInfos = {
  id: number;
  birthday: string;
  firstname: string;
  hashed_password: string;
  lastname: string;
  mail: string;
  number_of_vehicle: number;
  postal_code: number;
  insee_code: number;
  sex: string;
  city: string;
  departement: string;
  region: string;
};

type Location = Partial<
  Pick<
    ExtendedCsvDataType,
    | "region"
    | "departement"
    | "ville"
    | "code_insee_commune"
    | "code_insee"
    | "code_postal"
  >
>;
class UserRepository {
  // The C of CRUD - Create operation

  async create(user: Omit<User, "id">) {
    const location = await this.fetchLocation(user.city);
    const elementLocation: Location = {
      region: location.region,
      departement: location.departement,
      ville: user.city,
      code_insee_commune: location.inseecode,
      code_insee: location.inseecode,
      code_postal: user.postalcode,
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

    const insee_code_id = await insertDataRepository.insertInseeCode(
      elementLocation as ExtendedCsvDataType,
      city_id,
    );

    const postal_code_id = await insertDataRepository.insertPostalCode(
      elementLocation as ExtendedCsvDataType,
    );

    // Execute the SQL INSERT query to add a new user to the "user" table
    const [result] = await databaseClient.query<Result>(
      `insert into user 
      (firstname, lastname, hashed_password, mail, sex, birthday, postal_code_id, insee_code_id, number_of_vehicles)
      values
      (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.firstName,
        user.lastName,
        user.hashed_password,
        user.email,
        user.sex,
        this.convertDateFormat(user.birthday),
        postal_code_id,
        insee_code_id,
        0,
      ],
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  async fetchLocation(city: string) {
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
  }

  convertDateFormat(dateString: string) {
    if (!dateString.includes("/")) {
      return dateString;
    }

    const [day, month, year] = dateString.split("/");

    const formattedDate = `${year}-${month}-${day}`;

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

  async readAll(limit: number, offset: number, search: string) {
    let query = "select * from user";
    const params: (string | number)[] = [];

    if (search) {
      query += " where concat(lastname, firstname) like concat('%', ?, '%')";
      params.push(search);
    }

    if (!Number.isNaN(limit)) {
      if (!Number.isNaN(offset)) {
        query += " limit ?, ?";
        params.push(offset, limit);
      } else {
        query += " limit ?";
        params.push(limit);
      }
    }

    const [rows] = await databaseClient.query<Rows>(query, params);
    return rows;
  }

  async readUser(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where id = ?",
      [id],
    );

    return rows[0];
  }

  // The U of CRUD - Update operation
  async updateProfileInfos(user: UserInfos) {
    const postalCodeId = await insertDataRepository.verifyPostalCode(
      user.postal_code,
    );

    const userCity = user.city[0];

    // Utiliser insertDataRepository pour pouvoir compléter le user
    const inseeCodeId = await insertDataRepository.insertLocationFromInseeCode(
      user.insee_code,
      userCity,
      user.departement,
      user.region,
    );

    const [result] = await databaseClient.query<Result>(
      "update user set firstname = ?, lastname = ?, mail = ?, sex = ?, birthday = ?, postal_code_id = ?, insee_code_id = ? where id = ?",
      [
        user.firstname,
        user.lastname,
        user.mail,
        user.sex,
        user.birthday,
        postalCodeId,
        inseeCodeId,
        user.id,
      ],
    );
    return result;
  }
}

export default new UserRepository();
