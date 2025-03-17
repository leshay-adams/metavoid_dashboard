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
    router.push({ name: 'AvatarProfile', params: { id: avatarStore.avatars[avatarStore.avatars.length - 1].id } })
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
  <div class="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6">
    <h2 class="text-xl font-semibold text-center mb-4">Spawn Avatar</h2>

    <div class="space-y-4">
      <div>
        <label for="codename" class="block text-sm font-medium">Codename</label>
        <input
          id="codename"
          v-model="newAvatar.name"
          class="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter Codename"
          type="text"
          required
        />
      </div>
      <div>
        <label for="email" class="block text-sm font-medium">Email</label>
        <input
          id="email"
          v-model="newAvatar.email"
          class="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter Avatar Email"
          type="email"
          required
        />
      </div>
      <div>
        <label for="role" class="block text-sm font-medium">World Access Level</label>
        <select
          id="role"
          v-model="newAvatar.role"
          class="w-full mt-1 p-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option v-for="role in roles" :key="role.value" :value="role.value">
            {{ role.label }}
          </option>
        </select>
      </div>
      <div>
        <label for="status" class="block text-sm font-medium">Connection Status</label>
        <select
          id="status"
          v-model="newAvatar.status"
          class="w-full mt-1 p-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="active">{{ transformStatus('active') }}</option>
          <option value="inactive">{{ transformStatus('inactive') }}</option>
        </select>
      </div>
      <button
        @click="createAvatar"
        class="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        :disabled="isLoading"
      >
        {{ isLoading ? "Spawning..." : "Create Avatar" }}
      </button>
      <p v-if="successMsg" class="text-green-600 text-sm text-center mt-2">{{ successMsg }}</p>
      <p v-if="errMsg" class="text-red-600 text-sm text-center mt-2">{{ errMsg }}</p>
    </div>
  </div>
</template>
