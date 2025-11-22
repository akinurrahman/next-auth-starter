import { z } from 'zod';

export const emailSchema = z
  .email({ message: 'Please enter a valid email address' })
  .or(z.literal(''));

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

// Indian phone number validation: exactly 10 digits
export const phoneSchema = z
  .string()
  .length(10, 'Phone number must be exactly 10 digits')
  .regex(/^\d{10}$/, 'Phone number must contain only digits')
  .or(z.literal(''));
