import { UserController } from './user.cotroller';
import express from 'express';
import { UserValidations } from './user.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidations.createUserValidationSchema),
  UserController.createUser,
);

router.post('/login', UserController.loginUser);

export const UserRoutes = router;
