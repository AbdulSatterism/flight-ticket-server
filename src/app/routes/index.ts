import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { flightRoutes } from '../modules/flights/flights.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/',
    route: UserRoutes,
  },
  {
    path: '/',
    route: flightRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
