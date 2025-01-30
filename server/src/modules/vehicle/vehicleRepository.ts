import databaseClient, {
  type Result,
  type Rows,
} from "../../../database/client";

interface VehicleProps {
  id: number;
  model: string;
  brand: string;
  type: string;
  user_id: number;
}

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

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from vehicle where id = ?",
      [id],
    );

    return rows[0];
  }

  async updateVehicleInfos(vehicle: VehicleProps) {
    const [result] = await databaseClient.query<Result>(
      "update vehicle set model = ?, brand = ?, type = ?, user_id = ? where id = ?",
      [vehicle.model, vehicle.brand, vehicle.type, vehicle.user_id, vehicle.id],
    );

    return result;
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
