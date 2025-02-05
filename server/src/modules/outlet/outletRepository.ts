import type { PdcProps } from "../../../common/types/StationProps";
import databaseClient, { type Rows } from "../../../database/client";

class OutletRepository {
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select id, name, power_max, type from pdc where id = ?",
      [id],
    );

    return rows[0];
  }

  async readAllByStation(station_id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select id, name, power_max, type from pdc where station_id = ?",
      [station_id],
    );

    return rows as PdcProps[];
  }
}

export default new OutletRepository();
