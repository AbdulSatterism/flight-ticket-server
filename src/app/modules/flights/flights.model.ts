import { model, Schema } from 'mongoose';
import { IFlight } from './flights.interface';

const flightSchema = new Schema<IFlight>(
  {
    flightNumber: { type: String, required: true, unique: true },
    airline: { type: String, required: true },
    image: { type: String, required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    price: { type: Number, required: true },
    availableSeats: { type: [String], required: true },
    bookedSeats: { type: [String], default: [] },
    available: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Flight = model<IFlight>('Flight', flightSchema);
