import {
  ProductModel,
  Product,
  CreateProductData,
  UpdateProductData,
} from "../models";

export const ProductService = {
  async getAll(): Promise<Product[]> {
    return await ProductModel.findAll();
  },

  async getById(id: number): Promise<Product | null> {
    return await ProductModel.findById(id);
  },

  async getByName(name: string): Promise<Product[]> {
    return await ProductModel.findByName(name);
  },

  async create(productData: CreateProductData): Promise<Product> {
    return await ProductModel.create(productData);
  },

  async update(
    id: number,
    productData: UpdateProductData
  ): Promise<Product | null> {
    return await ProductModel.update(id, productData);
  },

  async delete(id: number): Promise<boolean> {
    return await ProductModel.delete(id);
  },
};
