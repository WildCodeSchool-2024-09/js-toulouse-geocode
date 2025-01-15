import databaseClient, { type Rows } from "../../../database/client";

class OperatorRepository {
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from operator where id = ?",
      [id],
    );

    return rows[0];
  }
}

export default new OperatorRepository();
