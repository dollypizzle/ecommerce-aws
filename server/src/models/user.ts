import { model, Schema, Document } from 'mongoose';
import { IntUser, IntUserModel } from './user.interface';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

const userSchema: Schema = new Schema(
  {
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate(value: string): any | boolean {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      },
    },
    telephone: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    tokens: [{ token: { type: String, required: true } }],
  },
  { toJSON: { virtuals: true }, timestamps: true }
);

userSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'owner',
});

userSchema.methods.toJSON = function(): Document {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function(): Promise<string> {
  const token: string = jwt.sign(
    { _id: this._id.toString() },
    process.env.JWT_SECRET || ''
  );

  this.tokens = this.tokens.concat({ token });

  await this.save();
  return token;
};

userSchema.statics.findByCredentials = async (
  email: string,
  password: string
): Promise<IntUser> => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compareSync(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

userSchema.pre<IntUser>('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const plaintext = this.get('password');
  this.set('password', bcrypt.hashSync(plaintext, 8));
  next();
});

const User: IntUserModel = model<IntUser, IntUserModel>('User', userSchema);

export { User };
