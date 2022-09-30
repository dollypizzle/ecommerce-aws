import { Document, Types, Model } from 'mongoose';

export interface UserInt extends Document {
  _id: Types.ObjectId;
  firstname: string;
  lastname: string;
  email: string;
  telephone: number;
  password: string;
  tokens: { token: string }[];
}

export interface IntUser extends UserInt {
  generateAuthToken: () => string;
}

export interface IntUserModel extends Model<IntUser> {
  findByCredentials: (email: string, password: string) => IntUser;
}

// Promise<IntUser>;
