<template>
  <div class="opacity bar">
    <SliderWithUnit
      :model-value="parseInt(`${modelValue * 100}`)"
      :max="100"
      @input="handleInput($event)"
    >
      <template #label>
        <svg-icon class="opacity-svg-icon" name="opacity" />
      </template>
    </SliderWithUnit>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SliderWithUnit from './SliderWithUnit.vue';

export default defineComponent({
  name: 'BarOpacity',

  components: {
    SliderWithUnit,
  },

  props: {
    modelValue: {
      type: Number,
      default: 1,
    },
  },

  setup(props, { emit }) {
    function handleInput(value: Event) {
      emit('input', (value as unknown as number) / 100);
    }

    return {
      handleInput,
    };
  },
});
</script>

<style lang="scss" scoped>
.opacity-svg-icon {
  width: 32px;
  height: 32px;
  margin-left: 5px;
}
</style>
