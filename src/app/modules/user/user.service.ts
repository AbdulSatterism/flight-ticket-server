/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { TLogin, TUser } from './user.interface';
import { User } from './user.model';
import { createToken } from './user.utils';
import config from '../../config';
import { Request } from 'express';

const createUserIntoDB = async (payload: TUser) => {
  const user = await User.isUserExistByEmail(payload?.email);

  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This user is already exist!');
  }

  //create new user
  const newUser = await User.create(payload);

  //create token and sent to the  client

  type TJWTPayload = {
    userId: any;
    role: 'Admin' | 'User';
    email: string;
  };

  const jwtPayload: TJWTPayload = {
    userId: newUser?._id,
    role: newUser?.role,
    email: newUser?.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expire_in as string,
  );

  const resUser = await User.findOne({ email: payload?.email });

  return { accessToken, resUser };
};

const loginUser = async (payload: TLogin) => {
  const { email, password } = payload;

  // check user exist or not
  const user = await User.findOne({ email: email }).select('+password');

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found');
  }

  //password matched or not
  const hashPassword = user?.password;
  const isPasswordMatch = await User.isPasswordMatched(password, hashPassword);
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'password not matched!!!');
  }

  //   jwt access token
  type TJWTPayload = {
    userId: any;
    role: 'Admin' | 'User';
    email: string;
  };

  const jwtPayload: TJWTPayload = {
    userId: user?._id,
    role: user?.role,
    email: user?.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expire_in as string,
  );

  const resUser = await User.findOne({ email: email });

  return { accessToken, resUser };
};

const logoutUser = async (req: Request) => {
  return req?.res?.clearCookie('accessToken');
};

export const UserServices = {
  createUserIntoDB,
  loginUser,
  logoutUser,
};
