
<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mockApi } from '../api/mockApi.ts'
import { useAvatarStore } from '../stores/avatarStore.ts'
import { transformRole } from '../utils/role'
import { transformStatus } from '../utils/status'

export default defineComponent({
  name: 'AvatarProfile',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const avatarStore = useAvatarStore()
    const avatar = ref<any>(null)
    const loading = ref(true)
    const error = ref('')

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

    onMounted(fetchAvatar)

    return { avatar, loading, error, saveChanges, transformRole, transformStatus, roles }
  }
})
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
        </div>
        <div>
          <label for="email">Comm Channel</label>
          <input
            id="email"
            v-model="avatar.email" 
            type="email"
          />
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
        </div>
        <div>
          <label for="status">Connection Status</label>
          <select id="status" v-model="avatar.status">
            <option value="active">{{ transformStatus('active') }}</option>
            <option value="inactive">{{ transformStatus('inactive') }}</option>
          </select>
        </div>
        <button type="submit">
          Lock in Updates
        </button>
      </form>
    </div>
  </div>
</template>
