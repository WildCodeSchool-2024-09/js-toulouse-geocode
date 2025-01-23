import databaseClient, { type Rows } from "../../../database/client";

class OutletRepository {
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from pdc where id = ?",
      [id],
    );

    return rows[0];
  }
}

export default new OutletRepository();
