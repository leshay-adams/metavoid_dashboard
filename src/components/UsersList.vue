<script setup lang="ts">
import {ref, onMounted } from 'vue'
import {mockApi, User} from '../api/mockApi.ts'

const users = ref<User[]>([])
const loading = ref(true)

const getAllUsers = async () => {
  loading.value = true
  try {
    const res = await mockApi.getUsers({ page: 1, limit: 50})
    users.value = res.data
  } catch (err) {
    console.error('User signal has been lost, trace unknown', err)
  } finally {
    loading.value = false
  }
}

onMounted(getAllUsers)
</script>

<template>
  <div class="relative overflow-x-auto">
      <table v-if="!loading" class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
              <tr v-for="user in users" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <td class="px-6 py-4">
                      {{ user.name }}
                  </td>
                  <td class="px-6 py-4">
                      {{ user.email }}
                  </td>
                  <td class="px-6 py-4">
                      {{ user.role }}
                  </td>
                  <td class="px-6 py-4">
                      {{ user.status }}
                  </td>
                  <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {{ new Date(user.dateJoined).toLocaleDateString() }}
                  </td>
              </tr>
          </tbody>
      </table>
      <h4 v-else>Booting Avatars...</h4>
  </div>
</template>
