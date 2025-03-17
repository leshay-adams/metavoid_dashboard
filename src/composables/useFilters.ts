import { ref } from 'vue'

export const useFilters = (avatarStore: any, fetchAvatars: Function) => {
  const nameFilter = ref('')
  const roleFilter = ref('')
  const statusFilter = ref('')
  const sortByField = ref('')
  const sortByOrder = ref('asc')
  const currentPage = ref(1)

  const resetFilters = () => {
    nameFilter.value = ''
    roleFilter.value = ''
    statusFilter.value = ''
    sortByField.value = ''
    sortByOrder.value = ''
  }

  const applyFilters = async () => {
    currentPage.value = 1
    await fetchAvatars(currentPage.value)
  }

  return {
    nameFilter,
    roleFilter,
    statusFilter,
    sortByField,
    sortByOrder,
    currentPage,
    resetFilters,
    applyFilters
  }
}
