<script setup lang="ts">
import AvatarList from '../components/AvatarList.vue'
import { useThemeStore } from '../stores/themeStore'

const themeStore = useThemeStore()
</script>

<template>
  <div class="space-y-4">
    <button @click="themeStore.toggleTheme()" class="p-2 rounded-lg bg-gray-200 dark:bg-gray-800">
      <span v-if="themeStore.darkMode">🌙 Dark</span>
      <span v-else>☀️ Light</span>
    </button>
    <AvatarList />
  </div>
</template>
