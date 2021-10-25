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
import useBackground from '@/state/background';
import StrawElement from './StrawElement.vue';
import useStraws from '@/state/straws';

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
.straws-render-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.straw-background {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
