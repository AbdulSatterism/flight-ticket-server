import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { flightValidations } from './flights.validation';
import { flightController } from './flights.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/flights',
  auth(USER_ROLE.Admin),
  validateRequest(flightValidations.createFlightValidationSchema),
  flightController.createFlight,
);

// get available flights
router.get('/flights', flightController.getAllAvailableFlight);
// get flights for searching method

router.get('/flights/search', flightController.getFlightsBySearch);
// get flight by id
router.get('/flights/:id', flightController.getSingleFlight);

router.put(
  '/flights/:id',
  auth(USER_ROLE.Admin),
  validateRequest(flightValidations.updateFlightValidationSchema),
  flightController.flightUpdate,
);

router.delete(
  '/flights/:id',
  auth(USER_ROLE.Admin),
  flightController.flightDelete,
);

export const flightRoutes = router;
