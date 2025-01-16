import DatabaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class UserPhotoRepository {
  async readPhoto(user_id: number): Promise<Rows> {
    const [rows] = await DatabaseClient.query<Rows>(
      "SELECT url FROM user_photos WHERE user_id = ?",
      [user_id],
    );
    return rows;
  }

  async updatePhoto(user_id: number, url: string): Promise<Result> {
    const [result] = await DatabaseClient.query<Result>(
      "INSERT INTO user_photos (user_id, url) VALUES (?, ?)",
      [user_id, url],
    );
    return result;
  }

  async deletePhoto(user_id: number): Promise<Result> {
    const [result] = await DatabaseClient.query<Result>(
      "DELETE FROM user_photos WHERE user_id = ?",
      [user_id],
    );
    return result;
  }
}

export default new UserPhotoRepository();
