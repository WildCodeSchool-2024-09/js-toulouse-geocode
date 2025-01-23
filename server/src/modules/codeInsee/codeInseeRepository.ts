import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

class codeInseeRepository {
  async readInseeCode(code: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from insee_code where id = ?",
      [code],
    );

    return rows[0];
  }
}

export default new codeInseeRepository();
