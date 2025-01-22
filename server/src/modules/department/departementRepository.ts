import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

class departementRepository {
  async readDepartement(departement_id: number): Promise<Rows> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM department WHERE department_id = ?",
      [departement_id],
    );
    return rows;
  }
}

export default new departementRepository();
