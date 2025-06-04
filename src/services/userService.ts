import { IUserService } from '../interfaces/IUserService';
import User, { IUser } from '../models/User';
import { UserInput, UserUpdateInput } from '../schemas/userSchema';

export class UserService implements IUserService {
  async createUser(userData: UserInput): Promise<IUser> {
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

  async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  async updateUser(id: string, userData: UserUpdateInput): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, userData, { new: true, runValidators: true });
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await User.findByIdAndDelete(id);
    return result !== null;
  }
}