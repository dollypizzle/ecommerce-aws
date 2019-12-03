import { model, Schema, Model } from 'mongoose';
import { IntProduct } from './product.interface';

const productSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true }
);

const Product: Model<IntProduct> = model<IntProduct>('Product', productSchema);

export default Product;
