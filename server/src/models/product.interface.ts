import { Document, Schema } from 'mongoose';

export interface IntProduct extends Document {
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  owner: Schema.Types.ObjectId;
}
