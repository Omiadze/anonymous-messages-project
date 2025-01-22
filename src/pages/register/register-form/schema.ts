import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z
    .string()
    .nonempty({ message: 'validation.email-required' })
    .email({ message: 'validation.email-invalid' }),
  password: z
    .string()
    .nonempty({ message: 'validation.password-required' })
    .min(6, { message: 'validation.password-min-length' })
    .max(20, { message: 'validation.password-max-length' }),
  confirmPassword: z
    .string()
    .nonempty({ message: 'validation.password-required' })
    .min(6, { message: 'validation.password-min-length' })
    .max(20, { message: 'validation.password-max-length' }),
});
