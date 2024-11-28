import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { User } from '../user/user.model';
import { IBooking } from './booking.interface';
import { Flight } from '../flights/flights.model';
import { Booking } from './booking.model';

const createBookingIntoDb = async (payload: IBooking) => {
  const { flightId, userId, seats } = payload;

  const userExist = await User.findById(userId);
  const flightExist = await Flight.findById(flightId);

  if (!userExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }
  if (!flightExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Flight not found!');
  }

  //
  const unavailableSeats = seats.filter(
    (seat: string) => flightExist.availableSeats.includes(seat) === false,
  );

  if (unavailableSeats.length > 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Some selected seats are not available!',
    );
  }

  // sit price calculation

  payload.totalPrice = seats.length * flightExist.price;

  const result = await Booking.create(payload);

  // Update flight seats
  const availableSeatsUpdate = flightExist.availableSeats.filter(
    (seat: string) => !seats.includes(seat),
  );

  const updateBookedSeats = [...flightExist.bookedSeats, ...seats];

  await Flight.findByIdAndUpdate(flightId, {
    availableSeats: availableSeatsUpdate,
    bookedSeats: updateBookedSeats,
  });

  return result;
};

// specific user get all booking
const getSpecificUserAllTicket = async (id: string) => {
  const userExist = await User.findById(id);

  if (!userExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }
  // Find bookings with populated flight details
  const result = await Booking.find({ userId: id })
    .populate('flightId')
    .sort({ createdAt: -1 });

  return result;
};

// specific user get all booking
const allTicketsByAdmin = async () => {
  // Find bookings with populated flight details
  const result = await Booking.find()
    .populate('flightId')
    .sort({ createdAt: -1 });

  return result;
};

// update booking admin only
const updateTicketAdmin = async (id: string, payload: IBooking) => {
  const bookingExist = await Booking.findById(id);
  if (!bookingExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'booking not found');
  }

  const result = await Booking.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

// delete booking by admin only
const deleteTicketAdmin = async (id: string) => {
  const bookingExist = await Booking.findById(id);
  if (!bookingExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'booking not found');
  }

  const result = await Booking.findByIdAndDelete(id, { new: true });

  return result;
};

export const bookingServices = {
  createBookingIntoDb,
  getSpecificUserAllTicket,
  allTicketsByAdmin,
  updateTicketAdmin,
  deleteTicketAdmin,
};
 