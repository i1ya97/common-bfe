import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export const getUsers = (req: Request, res: Response) => {
  /* #swagger.tags = ['Users'] */
  const users = UserService.getAll();
  return res.json({ data: users });
};
