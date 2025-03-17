
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
  <div>
    <h2>Avatar Profile</h2>
    <div v-if="loading">Loading avatar profile...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <form @submit.prevent="saveChanges">
        <div>
          <label for="name">Codename</label>
          <input
            id="name"
            v-model="avatar.name"
            type="text"
            v-focus
          />
          <p v-if="isNameValid">{{ isNameValid }}</p>
        </div>
        <div>
          <label for="email">Comm Channel</label>
          <input
            id="email"
            v-model="avatar.email" 
            type="email"
          />
          <p v-if="isEmailValid">{{ isEmailValid }}</p>
        </div>
        <div>
          <label for="role">World Access Level</label>
          <select id="role" v-model="avatar.role">
            <option
              v-for="role in roles"
              :key="role.value"
              :value="role.value"
            >
              {{ role.label }}
            </option>
          </select>
          <p v-if="isRoleValid">{{ isRoleValid }}</p>
        </div>
        <div>
          <label for="status">Connection Status</label>
          <select id="status" v-model="avatar.status">
            <option value="active">{{ transformStatus('active') }}</option>
            <option value="inactive">{{ transformStatus('inactive') }}</option>
          </select>
          <p v-if="isStatusValid">{{ isStatusValid }}</p>
        </div>
        <button type="submit" :disabled="!isFormValid">
          Lock in Updates
        </button>
      </form>
      <button @click="confirmPurgeAvatar">⚠️ Purge Avatar!</button>
    </div>
  </div>
</template>
