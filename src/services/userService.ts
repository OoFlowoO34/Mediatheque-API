import { IUserService } from '../interfaces/IUserService';
import User, { IUser } from '../models/User';
import { UserCreateZodType, UserUpdateZodType } from '../schemas/userSchema';

export class UserService implements IUserService {
  async createUser(userData: UserCreateZodType): Promise<IUser> {
    const existingUser = await User.findOne({ mail: userData.mail });
    if (existingUser) {
      throw new Error('Un utilisateur avec cet email existe déjà');
    }
    
    const newUser = new User(userData);
    return await newUser.save();
  }

  async getAllUsers(): Promise<IUser[]> {
    return await User.find();
  }

  async getUserById(userId: string): Promise<IUser | null> {
    return await User.findOne({ userId });
  }

  async updateUser(userId: string, userData: UserUpdateZodType): Promise<IUser | null> {
    return await User.findOneAndUpdate({ userId }, userData, { new: true, runValidators: true });
  }

  async deleteUser(userId: string): Promise<boolean> {
    const result = await User.findOneAndDelete({ userId });
    return result !== null;
  }
}