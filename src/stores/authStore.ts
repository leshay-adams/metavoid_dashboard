import { defineStore } from 'pinia';
import type { User } from '../types';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    currentUser: {
      id: '0',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      status: 'active',
      dateJoined: new Date().toISOString(),
    } as User | null,
  }),
});
