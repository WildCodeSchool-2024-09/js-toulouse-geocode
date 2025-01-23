import databaseClient, { type Rows } from "../../../database/client";

class signRepository {
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from sign where id = ?",
      [id],
    );

    return rows[0];
  }
}

export default new signRepository();
