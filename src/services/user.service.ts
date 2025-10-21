import { UserModel, User, CreateUserData, UpdateUserData } from "../models";

export const UserService = {
  async getAll(): Promise<User[]> {
    return await UserModel.findAll();
  },

  async getById(id: number): Promise<User | null> {
    return await UserModel.findById(id);
  },

  async getByEmail(email: string): Promise<User | null> {
    return await UserModel.findByEmail(email);
  },

  async create(userData: CreateUserData): Promise<User> {
    return await UserModel.create(userData);
  },

  async update(id: number, userData: UpdateUserData): Promise<User | null> {
    return await UserModel.update(id, userData);
  },

  async delete(id: number): Promise<boolean> {
    return await UserModel.delete(id);
  },
};
