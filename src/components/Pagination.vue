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

  const onClickFirstPage = () => emit('pagechanged', 1)
  const onClickPreviousPage = () => emit('pagechanged', props.currentPage - 1)
  const onClickPage = (page: number) => emit('pagechanged', page)
  const onClickNextPage = () => emit('pagechanged', props.currentPage + 1)
  const onClickLastPage = () => emit('pagechanged', props.totalPages)

</script>

<template>
  <button @click="onClickFirstPage" :disabled="isOnFirstPage" type="button">
    1
  </button>
  <button @click="onClickPreviousPage" :disabled="isOnFirstPage" type="button">
    <<
  </button>
  <button @click="onClickPage" :disabled="page.isDisabled">{{ page.name }}</button>
  <button @click="onClickNextPage" :disabled="isOnLastPage" type="button">
    >>
  </button>
  <button @click="onClickLastPage" :disabled="isOnLastPage" type="button">
    End
  </button>
</template>