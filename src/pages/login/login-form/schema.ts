import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .nonempty('validation.email-required')
    .email('validation.email-invalid'),
  password: z.string().nonempty('validation.password-required'),
});
