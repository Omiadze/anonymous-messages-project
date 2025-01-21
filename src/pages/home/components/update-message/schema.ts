import { z } from 'zod';

export const messageValidationSchema = z.object({
  from: z.string().nonempty('validation.from-required'),
  to: z.string().nonempty('validation.to-required'),
  message: z.string().nonempty('validation.message-required'),
});
