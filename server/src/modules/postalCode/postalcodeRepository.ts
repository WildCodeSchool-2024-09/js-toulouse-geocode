import databaseClient, { type Rows } from "../../../database/client";

class PostalcodeRepository {
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from postalcode where id = ?",
      [id],
    );

    return rows[0];
  }
}

export default new PostalcodeRepository();
