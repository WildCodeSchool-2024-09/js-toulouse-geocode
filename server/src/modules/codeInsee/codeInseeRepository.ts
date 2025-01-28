import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

class codeInseeRepository {
  async readInseeCode(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from insee_code where id = ?",
      [id],
    );

    return rows[0];
  }
}

export default new codeInseeRepository();
