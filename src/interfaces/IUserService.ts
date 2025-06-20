import { UserCreateZodType, UserUpdateZodType } from '../schemas/userSchema';
import { IUser } from '../models/User';

export interface IUserService {
  createUser(userData: UserCreateZodType): Promise<IUser>;
  getAllUsers(): Promise<IUser[]>;
  getUserById(id: string): Promise<IUser | null>;
  updateUser(id: string, userData: UserUpdateZodType): Promise<IUser | null>;
  deleteUser(id: string): Promise<boolean>;

}