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
      visiblePages.push({ name: i, disabled: i === props.currentPage })
    }
    return visiblePages
  })

  const onClickFirstPage = () => emit('pagechanged', 1)
  const onClickPreviousPage = () => emit('pagechanged', props.currentPage - 1)
  const onClickPage = (page: number) => emit('pagechanged', page)
  const onClickNextPage = () => emit('pagechanged', props.currentPage + 1)
  const onClickLastPage = () => { if (props.totalPages > 1 && props.currentPage !== props.totalPages) { emit('pagechanged', props.totalPages) }}

</script>

<template>
  <div>
    <button
      @click="onClickFirstPage"
      :disabled="isOnFirstPage"
      type="button"
      class="px-4 py-2 rounded-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all"
    >
      First
    </button>
    <button
      @click="onClickPreviousPage"
      :disabled="isOnFirstPage"
      type="button"
      class="px-3 py-2 rounded-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all"
    >
      &#60;&#60;
    </button>
    <button
      v-for="page in pages"
      @click="() => onClickPage(page.name)"
      :disabled="page.disabled"
      :class="[
        'px-4 py-2 rounded-lg font-medium transition-all',
        page.disabled
          ? 'bg-indigo-700 text-white'
          : 'bg-gray-800 text-gray-300 hover:bg-indigo-600 hover:text-white'
      ]"
    >
      {{ page.name }}
    </button>
    <button
      @click="onClickNextPage"
      :disabled="isOnLastPage"
      type="button"
      class="px-3 py-2 rounded-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all"
    >
      &#62;&#62;
    </button>
    <button
      @click="onClickLastPage"
      :disabled="isOnLastPage"
      type="button"
      class="px-4 py-2 rounded-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all"
    >
      Last
    </button>
  </div>
</template>