export interface User {
  id: number;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserData {
  email: string;
  password: string;
}

export interface UpdateUserData {
  email?: string;
  password?: string;
}

export class UserModel {
  static async create(userData: CreateUserData): Promise<User> {
    const { pool } = await import("../config/db.js");
    const client = await pool.connect();

    try {
      const result = await client.query(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
        [userData.email, userData.password]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  static async findById(id: number): Promise<User | null> {
    const { pool } = await import("../config/db.js");
    const client = await pool.connect();

    try {
      const result = await client.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  static async findByEmail(email: string): Promise<User | null> {
    const { pool } = await import("../config/db.js");
    const client = await pool.connect();

    try {
      const result = await client.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  static async findAll(): Promise<User[]> {
    const { pool } = await import("../config/db.js");
    const client = await pool.connect();

    try {
      const result = await client.query(
        "SELECT * FROM users ORDER BY created_at DESC"
      );
      return result.rows;
    } finally {
      client.release();
    }
  }

  static async update(
    id: number,
    userData: UpdateUserData
  ): Promise<User | null> {
    const { pool } = await import("../config/db.js");
    const client = await pool.connect();

    try {
      const fields = [];
      const values = [];
      let paramCount = 1;

      if (userData.email !== undefined) {
        fields.push(`email = $${paramCount++}`);
        values.push(userData.email);
      }
      if (userData.password !== undefined) {
        fields.push(`password = $${paramCount++}`);
        values.push(userData.password);
      }

      if (fields.length === 0) {
        return await this.findById(id);
      }

      fields.push(`updated_at = CURRENT_TIMESTAMP`);
      values.push(id);

      const result = await client.query(
        `UPDATE users SET ${fields.join(
          ", "
        )} WHERE id = $${paramCount} RETURNING *`,
        values
      );

      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  static async delete(id: number): Promise<boolean> {
    const { pool } = await import("../config/db.js");
    const client = await pool.connect();

    try {
      const result = await client.query("DELETE FROM users WHERE id = $1", [
        id,
      ]);
      return (result.rowCount ?? 0) > 0;
    } finally {
      client.release();
    }
  }
}
