<template>
  <svg
    :width="straw.width"
    :height="straw.height"
    :viewBox="`0 0 ${straw.width} ${straw.height}`"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      :x="straw.x * scale"
      :y="straw.y * scale"
      :ry="straw.ry * scale"
      :rx="straw.rx * scale"
      :width="computedRectWidth"
      :height="computedRectHeight"
      :style="computedStyle"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue';

import useTemplate from '@/store/template';

export default defineComponent({
  name: 'Shape',

  props: {
    straw: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props) {
    const straw = toRefs(props.straw);

    const { scale } = useTemplate();

    const computedStyle = computed(() => {
      const { fill, strokeWidth, strokeColor, opacity, strokeType, strokeSpacing, strokeLength } =
        straw;

      const strokeW = strokeWidth * scale.value;

      const styles: Record<string, any> = {
        fill,
        strokeWidth: strokeW,
        stroke: strokeColor,
        opacity,
      };

      if (strokeType !== 'solid') {
        if (!strokeLength) {
          styles.strokeLinecap = 'round';
        }
        styles.strokeDasharray = `${strokeLength * strokeW},${strokeSpacing * strokeW}`;
      }

      return styles;
    });

    const computedRectWidth = computed(() => {
      const { strokeWidth, width } = straw;
      return width.value - strokeWidth.value * scale.value;
    });

    const computedRectHeight = computed(() => {
      const { strokeWidth, height } = straw;
      return height.value - strokeWidth.value * scale.value;
    });

    return { computedStyle, computedRectWidth, computedRectHeight, scale };
  },
});
</script>
