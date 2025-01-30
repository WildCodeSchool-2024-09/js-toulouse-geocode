import databaseClient, {
  type Result,
  type Rows,
} from "../../../database/client";

class VehicleRepository {
  async create(brand: string, model: string, type: string, user_id: number) {
    const [result] = await databaseClient.query<Result>(
      "insert into vehicle (brand, model, type, user_id) values (?, ?, ?, ?)",
      [brand, model, type, user_id],
    );

    return result.insertId;
  }

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

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from vehicle where id = ?",
      [id],
    );

    return result;
  }
}

export default new VehicleRepository();
