import { ref } from 'vue';

export function useDebounce(value: any, delay: number = 500) {
  const debouncedValue = ref(value);
  let timeout: number;

  const setDebouncedValue = (newValue: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      debouncedValue.value = newValue;
    }, delay);
  };

  return {
    debouncedValue,
    setDebouncedValue,
  };
}
