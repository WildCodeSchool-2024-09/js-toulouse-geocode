import databaseClient, { type Rows } from "../../../database/client";

class GeoCoordsRepository {
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from geo_coords where id = ?",
      [id],
    );

    return rows[0];
  }
}

export default new GeoCoordsRepository();
