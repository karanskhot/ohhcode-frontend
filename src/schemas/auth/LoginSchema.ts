import z from 'zod';

export const LoginSchema = z.object({
  username: z.string().email('Invalid username or password'),
  password: z
    .string()
    .min(8, 'Invalid username or password')
    .regex(
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=!]).*$/,
      'Invalid username or password',
    ),
});

export type LoginRequestType = z.infer<typeof LoginSchema>;
