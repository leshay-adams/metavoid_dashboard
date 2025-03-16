import { defineStore } from 'pinia'
import type { User, Role } from '../types.ts'
import { mockApi } from '../api/mockApi.ts'

export const useAvatarStore = defineStore('avatarStore', {
  state: () => ({
    avatars: [] as User[],
    totalAvatars: 0,
    currentPage: 1,
    limit: 8,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchAvatars(params: { page?: number; filter?: any; sort?: any } = {}) {
      this.loading = true
      try {
        const res = await mockApi.getUsers({
          limit: this.limit,
          page: params.page || this.currentPage,
          sort: params.sort || {},
          filter: params.filter || {}
        })
        this.avatars = res.data
        this.totalAvatars = res.total
        this.currentPage = res.page
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  }
})
