import { z } from 'zod';

export const messageSchema = z.object({
  from: z
    .string()
    .min(1, { message: 'validation.from-required' })
    .max(100, { message: 'validation.from-max-length' }),
  to: z
    .string()
    .min(1, { message: 'validation.to-required' })
    .max(100, { message: 'validation.to-max-length' }),
  message: z
    .string()
    .min(1, { message: 'validation.message-required' })
    .max(500, { message: 'validation.message-max-length' }),
  avatar: z.string(),
  user_id: z.string(),
});
