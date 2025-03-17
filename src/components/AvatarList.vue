<script setup lang="ts">
import {ref, onMounted, watch, computed } from 'vue'
import { useAvatarStore } from '../stores/avatarStore'
import { useRouter } from 'vue-router'
import { transformRole } from '../utils/role'
import { transformStatus } from '../utils/status'
import Pagination from '../components/Pagination.vue'
import { useDebounce } from '../composables/useDebounce'
import { useFilters } from '../composables/useFilters'

const avatarStore = useAvatarStore()
const router = useRouter();

const goToAvatarProfile = (id: string) => {
  router.push({ name: 'AvatarProfile', params: { id }})
}

const limit = 8

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

const {
  nameFilter,
  roleFilter,
  statusFilter,
  sortByField,
  sortByOrder,
  currentPage,
  resetFilters,
  applyFilters
} = useFilters(avatarStore, fetchAvatars)

const { debouncedValue: debouncedNameFilter, setDebouncedValue } = useDebounce(nameFilter.value, 500)

const handlePageChange = (newPage: number) => {
  currentPage.value = newPage
  fetchAvatars(newPage)
}

const roles = computed(() => [
  { value: 'admin', label: `${transformRole('admin')} (Admin)`},
  { value: 'manager', label: `${transformRole('manager')} (Manager)`},
  { value: 'viewer', label: `${transformRole('viewer')} (Viewer)`}
])

const totalPages = computed(() => {
  return Math.ceil(avatarStore.totalAvatars / limit) || 1
})

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
  <div class="max-w-6xl mx-auto rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 relative overflow-x-auto p-6 shadow-lg transform transition-transform hover:scale-105">
    <div class="space-y-4 mb-8">
      <div class="flex justify-between">
        <div class="w-1/3 space-y-2">
          <label for="nameFilter" class="font-semibold text-lg text-white">Filter By Name</label>
          <input
            placeholder="Input Codename"
            type="text"
            v-model="nameFilter"
            id="nameFilter"
            @input="setDebouncedValue(nameFilter)"
            class="w-full rounded-lg p-3 text-white bg-gray-800 placeholder-gray-500 border-gray-700 focus:ring-2 focus:ring-blue-400"
          >
        </div>
        <div class="w-1/3 space-y-2">
          <label for="roleFilter" class="font-semibold text-lg text-white">Filter By Role</label>
          <select id="roleFilter" v-model="roleFilter" class="w-full rounded-lg p-3 text-white bg-gray-800 placeholder-gray-500 border-gray-700 focus:ring-2 focus:ring-blue-400">
            <option value="">All</option>
            <option v-for="role in roles" :key="role.value" :value="role.value">
              {{ role.label }}
            </option>
          </select>
        </div>
        <div class="w-1/3 space-y-2">
          <label for="statusFilter" class="font-semibold text-lg text-white">Filter By status</label>
          <select id="statusFilter" v-model="statusFilter" class="w-full rounded-lg p-3 text-white bg-gray-800 placeholder-gray-500 border-gray-700 focus:ring-2 focus:ring-blue-400">
            <option value="">All</option>
            <option value="active">
              {{ transformStatus('active') }}
            </option>
            <option value="inactive">
              {{ transformStatus('inactive') }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex justify-between space-x-4">
        <div class="w-1/3 space-y-2">
          <label for="sortByField" class="font-semibold text-lg text-white">Sort By</label>
          <select id="sortByField" v-model="sortByField"  class="w-full rounded-lg p-3 text-white bg-gray-800 placeholder-gray-500 border-gray-700 focus:ring-2 focus:ring-blue-400">
            <option value="">None</option>
            <option value="name">Name</option>
            <option value="dateJoined">Date Joined</option>
          </select>
        </div>
        <div class="w-1/3 space-y-2">
          <label for="sortByOrder" class="font-semibold text-lg text-white">Order</label>
          <select id="sortByOrder" v-model="sortByOrder"  class="w-full rounded-lg p-3 text-white bg-gray-800 placeholder-gray-500 border-gray-700 focus:ring-2 focus:ring-blue-400">
            <option value="">None</option>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
        <div class="flex justify-end items-center">
          <button @click="applyFilters" class="rounded-l bg-blue-600 text-white transition-all px-6 py-2 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
    <table v-if="!avatarStore.loading" class="w-full bg-gray-800 rounded-xl text-white text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-400 uppercase">
        <tr>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">Email</th>
          <th scope="col" class="px-6 py-3">Role</th>
          <th scope="col" class="px-6 py-3">Status</th>
          <th scope="col" class="px-6 py-3">Void Entry Date</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="avatar in avatarStore.avatars"
          :key="avatar.id"
          class="cursor-pointer hover:scale-105 transform transition-all duration-200 ease-in-out"
          @click="goToAvatarProfile(avatar.id)"
        >
          <td class="px-6 py-4">{{ avatar.name }}</td>
          <td class="px-6 py-4">{{ avatar.email }}</td>
          <td class="px-6 py-4 text-nowrap">{{ transformRole(avatar.role) }}</td>
          <td class="px-6 py-4 text-nowrap">{{ transformStatus(avatar.status) }}</td>
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
