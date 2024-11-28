import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ['Admin', 'User'],
    },
  },
  {
    timestamps: true,
  },
);

// password bcrypt
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.salt_round));

  next();
});

//save '' string after post
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// checking user exist for auth
userSchema.statics.isUserExistByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

//password matched
userSchema.statics.isPasswordMatched = async function (
  painPassword,
  hashPassword,
) {
  return await bcrypt.compare(painPassword, hashPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
