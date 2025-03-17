<script setup lang="ts">
import {ref, onMounted, watch, computed } from 'vue'
import { useAvatarStore } from '../stores/avatarStore'
import { useRouter } from 'vue-router'
import { transformRole } from '../utils/role'
import { transformStatus } from '../utils/status'
import Pagination from '../components/Pagination.vue'
import { useDebounce } from '../composables/useDebounce'

const avatarStore = useAvatarStore()
const router = useRouter();

const goToAvatarProfile = (id: string) => {
  router.push({ name: 'AvatarProfile', params: { id }})
}

const nameFilter = ref('')
const roleFilter = ref('')
const statusFilter = ref('')
const sortByField = ref('')
const sortByOrder = ref('asc')
const currentPage = ref(1)
const limit = 8
const totalPages = computed(() => {
  return Math.ceil(avatarStore.totalAvatars / limit) || 1
})
const { debouncedValue: debouncedNameFilter, setDebouncedValue } = useDebounce(nameFilter.value, 500)

const handlePageChange = (newPage: number) => {
  currentPage.value = newPage
  fetchAvatars(newPage)
}

const fetchAvatars = async (page: number) => {
  await avatarStore.fetchAvatars({ 
    page, 
    limit,
    filter: {
      name: nameFilter.value,
      role: roleFilter.value,
      status: statusFilter.value
    },
    sort: {
      field: sortByField.value || '',
      order: sortByOrder.value || ''
    }
  })
}

const useFilters = async () => {
  currentPage.value = 1
  await fetchAvatars(currentPage.value)
}

const roles = computed(() => [
  { value: 'admin', label: `${transformRole('admin')} (Admin)`},
  { value: 'manager', label: `${transformRole('manager')} (Manager)`},
  { value: 'viewer', label: `${transformRole('viewer')} (Viewer)`}
])

const resetFilters = () => {
  nameFilter.value = ''
  roleFilter.value = ''
  statusFilter.value = ''
  sortByField.value = ''
  sortByOrder.value = ''
}

watch(debouncedNameFilter, (newValue) => {
  nameFilter.value = newValue;
  fetchAvatars(currentPage.value);
});

onMounted(async () => {
  resetFilters()
  await fetchAvatars(currentPage.value)
})

</script>

<template>
  <div class="relative overflow-x-auto">
    <div>
      <div>
        <label for="nameFilter">Filter By Name</label>
        <input
          placeholder="Input Codename"
          type="text"
          v-model="nameFilter"
          id="nameFilter"
          @input="setDebouncedValue(nameFilter)"
        >
      </div>
      <div>
        <label for="roleFilter">Filter By Role</label>
        <select id="roleFilter" v-model="roleFilter">
          <option value="">All</option>
          <option v-for="role in roles" :key="role.value" :value="role.value">
            {{ role.label }}
          </option>
        </select>
      </div>
      <div>
        <label for="statusFilter">Filter By status</label>
        <select id="statusFilter" v-model="statusFilter">
          <option value="">All</option>
          <option value="active">
            {{ transformStatus('active') }}
          </option>
          <option value="inactive">
            {{ transformStatus('inactive') }}
          </option>
        </select>
      </div>
      <div>
        <label for="sortByField">Sort By</label>
        <select id="sortByField" v-model="sortByField">
          <option value="">None</option>
          <option value="name">Name</option>
          <option value="dateJoined">Date Joined</option>
        </select>
      </div>
      <div>
        <label for="sortByOrder">Order</label>
        <select id="sortByOrder" v-model="sortByOrder">
          <option value="">None</option>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>
      <button @click="useFilters">
        Apply Filters
      </button>
    </div>
    <table v-if="!avatarStore.loading" class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
              Name
          </th>
          <th scope="col" class="px-6 py-3">
              Email
          </th>
          <th scope="col" class="px-6 py-3">
              Role
          </th>
          <th scope="col" class="px-6 py-3">
              Status
          </th>
          <th scope="col" class="px-6 py-3">
              Void Entry Date
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="avatar in avatarStore.avatars"
          :key="avatar.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
          @click="goToAvatarProfile(avatar.id)"
        >
          <td class="px-6 py-4">
              {{ avatar.name }}
          </td>
          <td class="px-6 py-4">
              {{ avatar.email }}
          </td>
          <td class="px-6 py-4">
              {{ transformRole(avatar.role) }}
          </td>
          <td class="px-6 py-4">
              {{ transformStatus(avatar.status) }}
          </td>
          <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ new Date(avatar.dateJoined).toLocaleDateString() }}
          </td>
        </tr>
      </tbody>
    </table>
    <h4 v-else>Booting Avatars...</h4>
    <Pagination 
      :currentPage="currentPage"
      :totalPages="totalPages"
      @pagechanged="handlePageChange"
    />
  </div>
</template>
