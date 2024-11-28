import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { bookingValidations } from './booking.validation';
import { bookingConrollers } from './booking.controller';

const router = express.Router();

router.post(
  '/bookings',
  auth(USER_ROLE.Admin, USER_ROLE.User),
  validateRequest(bookingValidations.createBookingValidationSchema),
  bookingConrollers.createBooking,
);

// get tickets user specific user
router.get(
  '/bookings/user/:id',
  auth(USER_ROLE.Admin, USER_ROLE.User),
  bookingConrollers.userTickets,
);
// get all ticket by admin only
router.get(
  '/bookings',
  auth(USER_ROLE.Admin),
  bookingConrollers.allTicketByAdmin,
);
// update booking only admin
router.put(
  '/bookings/:id',
  auth(USER_ROLE.Admin),
  bookingConrollers.updateBookingByAdmin,
);

//delete booking by admin only

router.delete(
  '/bookings/:id',
  auth(USER_ROLE.Admin),
  bookingConrollers.deleteBookingByAdmin,
);

export const bookingRoutes = router;
