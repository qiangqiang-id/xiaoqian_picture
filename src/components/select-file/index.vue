<template>
  <input type="file" ref="inputRef" :accept="accept.join(',')" @input="handelInput" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'SelectFile',

  props: {
    accept: {
      type: Array,
      default: () => [],
    },
  },

  setup(props, { emit }) {
    const inputRef: any = ref(null);

    function handelInput(e: Event): void {
      const file = (e.target as HTMLInputElement).files?.[0];
      emit('inputFile', file);
    }

    function select() {
      inputRef.value?.click();
    }

    return { handelInput, select, inputRef };
  },
});
</script>

<style lang="scss" scoped>
input {
  display: none;
}
</style>
