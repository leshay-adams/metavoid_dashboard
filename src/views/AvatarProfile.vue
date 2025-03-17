
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mockApi } from '../api/mockApi.ts'
import { useAvatarStore } from '../stores/avatarStore.ts'
import { transformRole } from '../utils/role'
import { transformStatus } from '../utils/status'


const route = useRoute()
const router = useRouter()
const avatarStore = useAvatarStore()
const avatar = ref<any>({ name: '', email: '', role: '', status: '' })
const loading = ref(true)
const error = ref('')

const isNameValid = computed(() => (!avatar.value.name ? 'Codename is required' : ''))
const isEmailValid = computed(() => (!avatar.value.email || !/\S+@\S+\.\S+/.test(avatar.value.email) ? 'Enter a valid comm channel (email)' : ''))
const isRoleValid = computed(() => (!avatar.value.role ? 'World Access Level is required' : ''))
const isStatusValid = computed(() => (!avatar.value.status ? 'Connection Status is required' : ''))
const isFormValid = computed(() => (!isNameValid.value && !isEmailValid.value && !isRoleValid.value && !isStatusValid.value))

const fetchAvatar = async () => {
  loading.value = true
  try {
    const data = await mockApi.getUser(route.params.id)
    avatar.value = { ...data }
  } catch (err: any) {
    error.value = err.message || 'Severed Connection, avatar echo lost'
  } finally {
    loading.value = false
  }
}

const saveChanges = async () => {
  try {
    await avatarStore.updateAvatar(avatar.value)
    alert('Avatar updates locked into the void')
    router.push({ name: 'AvatarDashboard' })
  } catch (err) {
    alert('Severed Connection. avatar details could not be secured in the void')
  }
}

const roles = computed(() => [
  { value: 'admin', label: `${transformRole('admin')} (Admin)`},
  { value: 'manager', label: `${transformRole('manager')} (Admin)`},
  { value: 'viewer', label: `${transformRole('viewer')} (Admin)`}
])

const confirmationDialog = (msg: string): Promise<boolean> => {
  return new Promise((resolve) => {
    resolve(window.confirm(msg))
  })
}

const confirmPurgeAvatar = async () => {
  if (await confirmationDialog("Are you absolutely certain you wish to purge this avatar? This action is irreversible and will be lost forever in the void."))
  purgeAvatar()
}

const purgeAvatar = async () => {
  try {
    await avatarStore.deleteAvatar(route.params.id)
    alert("Avatar purged from existence")
    router.push({ name: 'AvatarDashboard' })
  } catch (err) {
    alert('Failed to purge the avatar. Please try again.')
  }
}

onMounted(fetchAvatar)
</script>

<template>
  <div class="max-w-2xl mx-auto rounded-xl text-white bg-gradient-to-r from-purple-600 to-blue-500 relative overflow-x-auto p-6 shadow-lg transform transition-transform hover:scale-105">
    <h2 class="text-2xl font-bold mb-4">Avatar Profile</h2>
    <div v-if="loading">Loading avatar profile...</div>
    <div v-else-if="error" class="text-red-400">{{ error }}</div>
    <div v-else>
      <form @submit.prevent="saveChanges" class="space-y-4">
        <div>
          <label for="name" class="text-white font-semibold text-lg">Codename</label>
          <input
            id="name"
            v-model="avatar.name"
            type="text"
            v-focus
            class="w-full rounded-lg p-3 text-white bg-gray-800 placeholder-gray-500 border-gray-700 focus:ring-2 focus:ring-blue-400"
          />
          <p v-if="isNameValid" class="text-red-400">{{ isNameValid }}</p>
        </div>
        <div>
          <label for="email" class="font-semibold text-lg">Comm Channel</label>
          <input
            id="email"
            v-model="avatar.email" 
            type="email"
            class="w-full rounded-lg p-3 bg-gray-800 placeholder-gray-500 border-gray-700 focus:ring-2 focus:ring-blue-400"
          />
          <p v-if="isEmailValid" class="text-red-400">{{ isEmailValid }}</p>
        </div>
        <div>
          <label for="role" class="font-semibold text-lg">World Access Level</label>
          <select id="role" v-model="avatar.role" class="w-full rounded-lg p-3 text-white bg-gray-800 border-gray-700 focus:ring-2 focus:ring-blue-400">
            <option
              v-for="role in roles"
              :key="role.value"
              :value="role.value"
            >
              {{ role.label }}
            </option>
          </select>
          <p v-if="isRoleValid" class="text-red-400">{{ isRoleValid }}</p>
        </div>
        <div>
          <label for="status" class="font-semibold text-lg">Connection Status</label>
          <select id="status" v-model="avatar.status"  class="w-full rounded-lg p-3 text-white bg-gray-800 border-gray-700 focus:ring-2 focus:ring-blue-400">
            <option value="active">{{ transformStatus('active') }}</option>
            <option value="inactive">{{ transformStatus('inactive') }}</option>
          </select>
          <p v-if="isStatusValid" class="text-red-400">{{ isStatusValid }}</p>
        </div>
        <div class="flex justify-between">
        <button type="submit" :disabled="!isFormValid" class="cursor-pointer rounded-lg bg-indigo-800 text-white px-6 py-2 transition-all hover:bg-blue-900 focus:ring-2 focus:ring-blue-400">
          🔒 Lock in Updates
        </button>
        <button @click="confirmPurgeAvatar" class="cursor-pointer rounded-lg bg-red-600 text-white px-6 py-2 transition-all hover:bg-red-700 focus:ring-2 focus:ring-red-400">⚠️ Purge Avatar!</button>
        </div>
      </form>
    </div>
  </div>
</template>
