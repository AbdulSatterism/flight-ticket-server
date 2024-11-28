import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    password: z.string(),
    email: z.string(),
    phone: z.string(),
    role: z.enum(['Admin', 'User']),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
};
