import { z } from 'zod';

export const ProfileSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'validation.username-required' })
    .max(50, { message: 'validation.username-too-long' }),
  full_name: z
    .string()
    .min(1, { message: 'validation.full_name-required' })
    .max(100, { message: 'validation.full_name-too-long' }),
  avatar_url: z.string().min(1, { message: 'validation.avatar-required' }),
});
