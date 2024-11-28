import { z } from 'zod';

const createFlightValidationSchema = z.object({
  body: z.object({
    flightNumber: z.string(),
    image:z.string(),
    airline: z.string(),
    origin: z.string(),
    destination: z.string(),
    date: z.string(),
    time: z.string(),
    price: z.number(),
    availableSeats: z.array(z.string())
  }),
});

const updateFlightValidationSchema = z.object({
  body: z.object({
    flightNumber: z.string().optional(),
    image:z.string().optional(),
    airline: z.string().optional(),
    origin: z.string().optional(),
    destination: z.string().optional(),
    date: z.string().optional(),
    time: z.string().optional(),
    price: z.number().optional(),
    availableSeats: z.array(z.string()).optional(),
    available:z.boolean().optional()
  }),
});

export const flightValidations = {
    createFlightValidationSchema,
    updateFlightValidationSchema
};
