import databaseClient, { type Rows } from "../../../database/client";

class VehicleRepository {
  async readAll(limit: number, offset: number, search: string) {
    let query = "select * from vehicle";

    const params: (string | number)[] = [];

    if (search) {
      query += " where model like concat('%', ?, '%')";
      params.push(search);
    }

    if (!Number.isNaN(limit)) {
      if (!Number.isNaN(offset)) {
        query += " limit ?, ?";
        params.push(offset, limit);
      } else {
        query += " limit ?";
        params.push(limit);
      }
    }

    const [rows] = await databaseClient.query<Rows>(query, params);

    return rows;
  }

  async ReadAllWithUserId(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from vehicle where user_id = ?",
      [userId],
    );

    return rows;
  }

  async deleteWithUserId(userId: number) {
    await databaseClient.query("delete from vehicle where user_id = ?", [
      userId,
    ]);
  }
}

export default new VehicleRepository();
