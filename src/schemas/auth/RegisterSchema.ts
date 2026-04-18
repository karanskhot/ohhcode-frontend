import z from 'zod';

const RoleEnum = z.enum(['ROLE_USER', 'ROLE_ADMIN']);

export const RegisterSchema = z.object({
  firstName: z
    .string()
    .min(1, 'first name is required')
    .max(30, 'first name cannot exceed 50 characters.'),
  lastName: z
    .string()
    .min(1, 'last name is required')
    .max(30, 'last name cannot exceed 50 characters.'),
  username: z
    .string()
    .min(1, 'email is required')
    .email('Please provid a valid email address')
    .regex(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,
      'Invalid email format',
    ),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=!]).*$/,
      'Password must be alphanumeric and contain at least one special character',
    ),
  role: RoleEnum.optional(),
});

export type RegisterRequestType = z.infer<typeof RegisterSchema>;
