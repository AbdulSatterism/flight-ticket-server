import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { flightRoutes } from '../modules/flights/flights.route';
import { bookingRoutes } from '../modules/booking/booking.route';

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
  {
    path: '/',
    route: bookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
