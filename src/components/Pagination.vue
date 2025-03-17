<script setup lang="ts">
  import { computed, defineProps, defineEmits } from 'vue'

  const props = defineProps({
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  })

  const emit = defineEmits(['pagechanged'])

  const isOnFirstPage = computed(() => props.currentPage === 1)
  const isOnLastPage = computed(() => props.currentPage === props.totalPages)

  const pages = computed(() => {
    const visiblePages: { name: number; disabled: boolean }[] = []
    for (let i = 1; i <= props.totalPages; i++) {
      visiblePages.push({ name: i, isDisabled: i === props.currentPage })
    }
    return visiblePages
  })

</script>

<template>
  <button @click="" :disabled="isOnFirstPage" type="button">
    1
  </button>
  <button @click="" :disabled="isOnFirstPage" type="button">
    <<
  </button>
  <button @click="" :disabled="isOnFirstPage" type="button">
    >>
  </button>
  <button @click="" :disabled="isOnFirstPage" type="button">
    End
  </button>
</template>