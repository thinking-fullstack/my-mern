import { User } from "../models/User";

export const getUserById = async (userId: string) => {
  return User.findById(userId);
}

export const getUserByEmail = async (email: string) => {
  return User.findOne({ email });
}
