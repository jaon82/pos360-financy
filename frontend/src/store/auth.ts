import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apolloClient } from '@/lib/apollo';
import { REGISTER } from '@/lib/graphql/mutations/Register';
import type { AuthResponse, User } from '@/types';

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  register: (registerInput: RegisterInput) => Promise<boolean>;
  clearAuthData: () => void;
}

type RegisterResponse = {
  register: AuthResponse;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      register: async ({ name, email, password }: RegisterInput) => {
        try {
          // Call your registration API here and get the response
          const { data, error } = await apolloClient.mutate<RegisterResponse>({
            mutation: REGISTER,
            variables: { data: { name, email, password } },
          });
          if (data?.register) {
            const { token, user } = data.register;
            set({
              user,
              token,
              isAuthenticated: true,
            });
            return true;
          } else {
            console.error('Cadastro falhou:', error?.message);
            return false;
          }
        } catch (error) {
          console.error('Erro ao fazer cadastro:', error);
          throw error;
        }
      },
      clearAuthData: () =>
        set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage', // name of the item in storage
      //getStorage: () => localStorage, // use localStorage for persistence
    },
  ),
);
