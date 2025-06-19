import UserModel, { IUser } from '../models/User';
import { AppError } from '../utils/appError';
import { UserCreateZodType, UserUpdateZodType } from '../schemas/userSchema';
import { IUserService } from '../interfaces/IUserService';
import type { LogHelper } from '../utils/logger/loggerHelper';
import Emprunt from '../models/Emprunt';

export const createUserService = (logger: LogHelper): IUserService => {
  return {
    async createUser(userData: UserCreateZodType): Promise<IUser> {
      // Check if email is in the update and already taken by another user
      if (userData.mail) {
        const existingUserWithEmail = await UserModel.findOne({ mail: userData.mail });
        if (existingUserWithEmail) {
          logger.error(`Email already in use: ${userData.mail}`);
          throw new AppError("Email already in use", 400);
        }
      }
      // Check if telephone is in the update and already taken by another user
      if (userData.telephone) {
        const existingUserWithPhone = await UserModel.findOne({ telephone: userData.telephone });
        if (existingUserWithPhone) {
          throw new AppError("Phone number already in use", 400);
        }
      }
      const newUser = new UserModel(userData);
      return await newUser.save();
    },

    async getAllUsers(): Promise<IUser[]> {
      return await UserModel.find();
    },

    async getUserById(userId: string): Promise<IUser | null> {
      const user = await UserModel.findOne({ userId });
      if (!user) {
        throw new AppError("User not found", 404);
      }
      return user;
    },

    async updateUser(userId: string, userData: UserUpdateZodType): Promise<IUser> {
      //Check if user exists
      const existingUser = await UserModel.findOne({ userId });
      if (!existingUser) {
        throw new AppError("User not found", 404);
      }
      // Check if email is in the update and already taken by another user
      if (userData.mail) {
        const existingUserWithEmail = await UserModel.findOne({ mail: userData.mail, userId: { $ne: userId } });
        if (existingUserWithEmail) {
          throw new AppError("Email already in use", 400);
        }
      }
      // Check if telephone is in the update and already taken by another user
      if (userData.telephone) {
        const existingUserWithPhone = await UserModel.findOne({ telephone: userData.telephone, userId: { $ne: userId } });
        if (existingUserWithPhone) {
          throw new AppError("Phone number already in use", 400);
        }
      }
      const updatedUser = await UserModel.findOneAndUpdate({ userId }, userData, { new: true, runValidators: true });
      if (!updatedUser) {
        throw new AppError("Unexpected error during update", 500);
      }
      return updatedUser;
    },

    async deleteUser(userId: string): Promise<boolean> {
      const deleted = await UserModel.findOneAndDelete({ userId });
      if (!deleted) {
        throw new AppError("User not found", 404);
      }
      return true;
    },
    async hasActiveLoan(userId: string): Promise<boolean> {
      const emprunt = await Emprunt.findOne({ utilisateurId: userId });
      return !!emprunt;
    }
  };
};