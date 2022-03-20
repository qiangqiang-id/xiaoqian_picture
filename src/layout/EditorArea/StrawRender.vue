<template>
  <div
    class="straws-render-container mosaic-background"
    @mousedown="$emit('handleMouseDownLeft', $event)"
  >
    <div class="straw-background" :style="renderBackground" />

    <template v-for="straw in straws" :key="straw.id">
      <StrawElement :ref="straw.id" :straw="straw" v-bind="$attrs" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import useBackground from '@/store/background';
import StrawElement from './StrawElement.vue';
import useStraws from '@/store/straws';

export default defineComponent({
  name: 'StrawsRender',

  components: {
    StrawElement,
  },

  emits: {
    handleMouseDownLeft: null,
  },

  setup() {
    const { color, image, opacity } = useBackground();
    const { straws } = useStraws();

    const renderBackground = computed(() => {
      return {
        backgroundColor: color.value,
        backgroundImage: `url(${image.value})`,
        opacity: opacity.value ?? 1,
      };
    });

    const handleMouseDownLeft = (event: Event) => {
      console.log('cahufa', event.target);
    };

    return { renderBackground, straws, handleMouseDownLeft };
  },
});
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
