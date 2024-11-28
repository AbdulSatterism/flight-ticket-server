/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { IFlight } from './flights.interface';
import { Flight } from './flights.model';

const createFlightIntoDB = async (payload: IFlight) => {
  const { flightNumber } = payload;
  const flightExist = await Flight.findOne({ flightNumber });

  if (flightExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This Flight is already exist!');
  }

  const result = await Flight.create(payload);

  return result;
};

// get available flights for users; if flight not available then don't show those

const getAllAvailableFlightFromDB = async () => {
  const result = await Flight.find({ available: true });

  return result;
};

// get flights by searching date, destination, origin

const getFlightsBySearching = async (query: {
  origin?: string;
  destination?: string;
  date?: string;
}) => {
  const { origin, destination, date } = query;

  // Build the query object dynamically based on the provided search criteria
  const search: any = {};

  if (origin) {
    search.origin = { $regex: origin, $options: 'i' };
  }

  if (destination) {
    search.destination = { $regex: destination, $options: 'i' };
  }

  if (date) {
    // Parse the date string into a Date object and filter flights by exact date
    const parsedDate = new Date(date as string);
    search.date = parsedDate;
  }

  // Fetch flights based on the dynamic query
  const flights = await Flight.find(query);

  return flights;
};

// get flight by id
const getFlightById = async (id: string) => {
  const flightExist = await Flight.findById(id);

  if (!flightExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This flight is not available in database',
    );
  }

  return flightExist;
};

const updateFlightByAdmin = async (id: string, payload: IFlight) => {
  const flightExist = await Flight.findById(id);

  if (!flightExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This flight is not available in database',
    );
  }

  const result = await Flight.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

const deleteFlightByAdmin = async (id: string) => {
  const flightExist = await Flight.findById(id);

  if (!flightExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This Flight is not available in database',
    );
  }

  const result = await Flight.findByIdAndDelete(id, { new: true });

  return result;
};

export const flightServices = {
  createFlightIntoDB,
  updateFlightByAdmin,
  deleteFlightByAdmin,
  getAllAvailableFlightFromDB,
  getFlightsBySearching,
  getFlightById,
};
