<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAvatarStore } from '../stores/avatarStore'
import { useRouter } from 'vue-router'
import { transformRole } from '../utils/role'
import { transformStatus } from '../utils/status'

const avatarStore = useAvatarStore()
const router = useRouter()

const newAvatar = ref({
  name: '',
  email: '',
  role: 'viewer',
  status: 'active'
})

const isLoading = ref(false)
const errMsg = ref('')
const successMsg = ref('')

const createAvatar = async () => {
  isLoading.value = true
  errMsg.value = ''
  successMsg.value = ''

  try {
    await avatarStore.addAvatar(newAvatar.value)
    successMsg.value = 'Avatar spawned in void!'
    router.push({
      name: 'AvatarProfile',
      params: { id: avatarStore.avatars[avatarStore.avatars.length - 1].id }
    })
  } catch (err) {
    errMsg.value = 'Avatar spawn failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const roles = computed(() => [
  { value: 'admin', label: `${transformRole('admin')} (Admin)` },
  { value: 'manager', label: `${transformRole('manager')} (Manager)` },
  { value: 'viewer', label: `${transformRole('viewer')} (Viewer)` }
])
</script>

<template>
  <div class="max-w-2xl mx-auto rounded-xl text-white bg-gradient-to-r from-purple-600 to-blue-500 relative overflow-x-auto p-6 shadow-lg transform transition-transform hover:scale-105">
    <h2 class="text-2xl font-bold mb-4 text-center">Spawn Avatar</h2>

    <div class="space-y-4">
      <div>
        <label for="codename" class="text-white font-semibold text-lg">Codename</label>
        <input
          id="codename"
          v-model="newAvatar.name"
          class="w-full rounded-lg p-3 text-white bg-gray-800 placeholder-gray-500 border-gray-700 focus:ring-2 focus:ring-blue-400"
          placeholder="Enter Codename"
          type="text"
          required
        />
      </div>
      <div>
        <label for="email" class="font-semibold text-lg">Comm Channel</label>
        <input
          id="email"
          v-model="newAvatar.email"
          class="w-full rounded-lg p-3 bg-gray-800 placeholder-gray-500 border-gray-700 focus:ring-2 focus:ring-blue-400"
          placeholder="Enter Avatar Email"
          type="email"
          required
        />
      </div>
      <div>
        <label for="role" class="font-semibold text-lg">World Access Level</label>
        <select
          id="role"
          v-model="newAvatar.role"
          class="w-full rounded-lg p-3 text-white bg-gray-800 border-gray-700 focus:ring-2 focus:ring-blue-400"
        >
          <option v-for="role in roles" :key="role.value" :value="role.value">
            {{ role.label }}
          </option>
        </select>
      </div>
      <div>
        <label for="status" class="font-semibold text-lg">Connection Status</label>
        <select
          id="status"
          v-model="newAvatar.status"
          class="w-full rounded-lg p-3 text-white bg-gray-800 border-gray-700 focus:ring-2 focus:ring-blue-400"
        >
          <option value="active">{{ transformStatus('active') }}</option>
          <option value="inactive">{{ transformStatus('inactive') }}</option>
        </select>
      </div>
      <button
        @click="createAvatar"
        class="w-full cursor-pointer rounded-lg bg-indigo-800 text-white px-6 py-2 transition-all hover:bg-blue-900 focus:ring-2 focus:ring-blue-400"
        :disabled="isLoading"
      >
        {{ isLoading ? "Spawning..." : "Spawn Avatar" }}
      </button>
      <p v-if="successMsg" class="text-green-400 text-sm text-center mt-2">{{ successMsg }}</p>
      <p v-if="errMsg" class="text-red-400 text-sm text-center mt-2">{{ errMsg }}</p>
    </div>
  </div>
</template>
