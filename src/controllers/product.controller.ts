import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

export const getProducts = (req: Request, res: Response) => {
  /* #swagger.tags = ['Products'] */
  const products = ProductService.getAll();
  return res.json({ data: products });
};
