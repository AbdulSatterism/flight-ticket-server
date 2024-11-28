import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/appError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requireRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tokenWithBearer = req.headers.authorization;
    const token = tokenWithBearer?.split(' ')[1];

    // check token exist or not
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!!!');
    }
    //   //check token valid or not

    const decoded = jwt.verify(
      token,
      config.jwt_access_token as string,
    ) as JwtPayload;

    //   // check role
    const { role, userId } = decoded;

    //   // check user exist or not
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'user not found');
    }

    if (requireRole && !requireRole.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!!!');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
