import databaseClient, { type Result } from "../../../database/client";

type ContactProps = {
  id: number;
  ask_type: string;
  name: string;
  email: string;
  message: string;
};

class ContactRepository {
  // The C of CRUD - Create operation

  async create(item: Omit<ContactProps, "id">) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseClient.query<Result>(
      "insert into contact (ask_type, name, mail, message) values (?, ?, ?, ?)",
      [item.ask_type, item.name, item.email, item.message],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }
}

export default new ContactRepository();
