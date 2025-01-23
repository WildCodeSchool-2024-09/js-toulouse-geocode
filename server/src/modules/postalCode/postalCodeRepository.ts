import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

class postalCodeRepository {
  async readPostalCode(postalCode: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM postalcode WHERE id = ?",
      [postalCode],
    );

    return rows[0];
  }

  async readPostalCodeIdByPostalCode(postalcode: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id FROM postalcode WHERE code = ?",
      [postalcode],
    );

    return rows[0];
  }
}

export default new postalCodeRepository();
