import { defineStore } from 'pinia';

export const useThemeStore = defineStore('themeStore', {
  state: () => ({
    darkMode: localStorage.getItem('theme') === 'dark', // Fix: Ensure it's a boolean
  }),

  actions: {
    toggleTheme() {
      this.darkMode = !this.darkMode;
      localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');

      document.documentElement.classList.toggle('dark', this.darkMode);
    },

    initializeTheme() {
      const savedTheme = localStorage.getItem('theme');
      this.darkMode = savedTheme === 'dark'; // Fix: Set state correctly

      document.documentElement.classList.toggle('dark', this.darkMode);
    },
  },
});
