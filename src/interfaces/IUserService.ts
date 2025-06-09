import { UserInput, UserUpdateInput } from '../schemas/userSchema';
import { IUser } from '../models/User';

export interface IUserService {
  createUser(userData: UserInput): Promise<IUser>;
  getAllUsers(): Promise<IUser[]>;
  getUserById(id: string): Promise<IUser | null>;
  updateUser(id: string, userData: UserUpdateInput): Promise<IUser | null>;
  deleteUser(id: string): Promise<boolean>;
}