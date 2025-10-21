export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateProductData {
  name: string;
  price: number;
  description?: string;
}

export interface UpdateProductData {
  name?: string;
  price?: number;
  description?: string;
}

export class ProductModel {
  static async create(productData: CreateProductData): Promise<Product> {
    const { pool } = await import("../config/db.js");
    const client = await pool.connect();

    try {
      const result = await client.query(
        "INSERT INTO products (name, price, description) VALUES ($1, $2, $3) RETURNING *",
        [productData.name, productData.price, productData.description]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  static async findById(id: number): Promise<Product | null> {
    const { pool } = await import("../config/db.js");
    const client = await pool.connect();

    try {
      const result = await client.query(
        "SELECT * FROM products WHERE id = $1",
        [id]
      );
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  static async findAll(): Promise<Product[]> {
    const { pool } = await import("../config/db.js");
    const client = await pool.connect();

    try {
      const result = await client.query(
        "SELECT * FROM products ORDER BY created_at DESC"
      );
      return result.rows;
    } finally {
      client.release();
    }
  }

  static async findByName(name: string): Promise<Product[]> {
    const { pool } = await import("../config/db.js");
    const client = await pool.connect();

    try {
      const result = await client.query(
        "SELECT * FROM products WHERE name ILIKE $1 ORDER BY created_at DESC",
        [`%${name}%`]
      );
      return result.rows;
    } finally {
      client.release();
    }
  }

  static async update(
    id: number,
    productData: UpdateProductData
  ): Promise<Product | null> {
    const { pool } = await import("../config/db.js");
    const client = await pool.connect();

    try {
      const fields = [];
      const values = [];
      let paramCount = 1;

      if (productData.name !== undefined) {
        fields.push(`name = $${paramCount++}`);
        values.push(productData.name);
      }
      if (productData.price !== undefined) {
        fields.push(`price = $${paramCount++}`);
        values.push(productData.price);
      }
      if (productData.description !== undefined) {
        fields.push(`description = $${paramCount++}`);
        values.push(productData.description);
      }

      if (fields.length === 0) {
        return await this.findById(id);
      }

      fields.push(`updated_at = CURRENT_TIMESTAMP`);
      values.push(id);

      const result = await client.query(
        `UPDATE products SET ${fields.join(
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
      const result = await client.query("DELETE FROM products WHERE id = $1", [
        id,
      ]);
      return (result.rowCount ?? 0) > 0;
    } finally {
      client.release();
    }
  }
}
