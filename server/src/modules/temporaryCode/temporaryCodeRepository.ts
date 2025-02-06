import databaseClient, { type Result } from "../../../database/client";

class TemporaryCodeRepository {
  async create(code: string, user_id: number) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO temporary_code (code, user_id) VALUES (?, ?)",
      [code, user_id],
    );

    return result.insertId;
  }

  async read(user_id: number) {
    const [result] = await databaseClient.query<Result>(
      "SELECT * FROM temporary_code WHERE user_id = ?",
      [user_id],
    );

    return result;
  }

  async delete(user_id: number) {
    await databaseClient.query<Result>(
      "DELETE FROM temporary_code WHERE user_id = ?",
      [user_id],
    );
  }
}

export default new TemporaryCodeRepository();
