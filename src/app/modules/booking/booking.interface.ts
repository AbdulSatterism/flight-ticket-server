import { Types } from 'mongoose';

export interface IBooking {
  userId: Types.ObjectId;
  flightId: Types.ObjectId;
  seats: string[];
  totalPrice: number;
  status: 'pending' | 'booked';
}
