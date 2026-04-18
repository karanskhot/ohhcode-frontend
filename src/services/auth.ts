import { LoginRequestType } from '@/schemas/auth/LoginSchema';
import { RegisterRequestType } from '@/schemas/auth/RegisterSchema';
import { CurrentUser } from '@/types/auth/CurrentUser.types';
import { RegisterResponseType } from '@/types/auth/RegisterResponse.types';

export const authService = {
  login: async (data: LoginRequestType) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      },
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Something went wrong');
    }
    return await response.json();
  },

  register: async (
    payload: RegisterRequestType,
  ): Promise<RegisterResponseType> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include',
      },
    );
    if (!response.ok) {
      const errorData = await response.json();
      return {
        message: errorData.error || 'Something went wrong',
        username: '',
      };
    }
    return await response.json();
  },

  currentUser: async (): Promise<CurrentUser> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    );
    if (!response.ok) {
      throw new Error('Unauthorized.');
    }
    return await response.json();
  },
};
