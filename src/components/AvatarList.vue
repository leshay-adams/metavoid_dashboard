<script setup lang="ts">
import {ref, onMounted, watch, computed } from 'vue'
import { useAvatarStore } from '../stores/avatarStore'
import { useRouter } from 'vue-router'
import { transformRole } from '../utils/role'
import { transformStatus } from '../utils/status'
import Pagination from '../components/Pagination.vue'

const avatarStore = useAvatarStore()
const router = useRouter();

const goToAvatarProfile = (id: string) => {
  router.push({ name: 'AvatarProfile', params: { id }})
}

const currentPage = ref(1)
const limit = 8

const totalPages = computed(() => {
  return Math.ceil(avatarStore.totalAvatars / limit) || 1
})

const handlePageChange = (newPage: number) => {
  currentPage.value = newPage
  fetchAvatars(newPage)
}

const fetchAvatars = async (page: number) => {
  await avatarStore.fetchAvatars({ page, limit })
}

onMounted(async () => {
  await fetchAvatars(currentPage.value)
})

</script>

<template>
  <div class="relative overflow-x-auto">
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
