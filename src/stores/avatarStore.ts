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
    async getAvatarById(id: string) {
      this.loading = true
      try {
        return await mockApi.getUser(id)
      } catch (err: any) {
        this.error = err.message
        return null
      } finally {
        this.loading = false
      }
    },

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
    },

    async addAvatar(newAvatar: User) {
      this.loading = true
      try {
        const addedAvatar = await mockApi.createUser(newAvatar)
        this.avatars.push(addedAvatar)
        this.totalAvatars++
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async updateAvatar(updatedAvatar: User) {
      this.loading = true
      try {
        const index = this.avatars.findIndex(user => user.id === updatedAvatar.id)
        if (index !== -1) {
          const { id, dateJoined, ...updates } = updatedAvatar

          const updatedUser = await mockApi.updateUser(updatedAvatar.id, updates)
          this.avatars[index] = updatedUser
        }
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async deleteAvatar(id: string) {
      this.loading = true
      try {
        await mockApi.deleteUser(id)
        this.avatars = this.avatars.filter(user => user.id !== id)
        this.totalAvatars--
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  }
})
