import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

class cityRepository {
  async readCity(id: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM city WHERE id = ?",
      [id],
    );

    return rows[0];
  }
}

export default new cityRepository();
