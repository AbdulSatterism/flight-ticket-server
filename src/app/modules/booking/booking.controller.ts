import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { bookingServices } from './booking.services';

const createBooking = catchAsync(async (req, res) => {
  const result = await bookingServices.createBookingIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking successfully',
    data: result,
  });
});

// get specific user tickets
const userTickets = catchAsync(async (req, res) => {
  const result = await bookingServices.getSpecificUserAllTicket(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieve all user ticket',
    data: result,
  });
});

// get all ticket by admin
const allTicketByAdmin = catchAsync(async (req, res) => {
  const result = await bookingServices.allTicketsByAdmin();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieve all  ticket',
    data: result,
  });
});

const updateBookingByAdmin = catchAsync(async (req, res) => {
  const result = await bookingServices.updateTicketAdmin(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'booking updated',
    data: result,
  });
});

const deleteBookingByAdmin = catchAsync(async (req, res) => {
  const result = await bookingServices.deleteTicketAdmin(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'booking deleted succefully',
    data: result,
  });
});

export const bookingConrollers = {
  createBooking,
  userTickets,
  allTicketByAdmin,
  updateBookingByAdmin,
  deleteBookingByAdmin,
};
