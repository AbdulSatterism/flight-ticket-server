import { z } from 'zod';

const createBookingValidationSchema = z.object({
  body: z.object({
    userId: z.string(),
    flightId: z.string(),
    seats: z.array(z.string()),
    totalPrice: z.number(),
  }),
});

const updateBookingValidationSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
    flightId: z.string().optional(),
    seats: z.array(z.string()).optional(),
    totalPrice: z.number().optional(),
    status: z.string().optional(),
  }),
});

export const bookingValidations = {
  createBookingValidationSchema,
  updateBookingValidationSchema,
};
