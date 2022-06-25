<template>
  <svg
    :width="data.width"
    :height="data.height"
    :viewBox="`0 0 ${data.width} ${data.height}`"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      :x="data.x * templateStore.scale"
      :y="data.y * templateStore.scale"
      :ry="data.ry * templateStore.scale"
      :rx="data.rx * templateStore.scale"
      :width="computedRectWidth"
      :height="computedRectHeight"
      :style="computedStyle"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, PropType } from 'vue';
import { useTemplate } from '@/store';
import { layerShape } from '@/types/layer';

export default defineComponent({
  name: 'Shape',

  props: {
    data: {
      type: Object as PropType<layerShape>,
    },
  },

  setup(props) {
    const data = toRefs(props.data);

    const templateStore = useTemplate();

    const computedStyle = computed(() => {
      const { fill, strokeWidth, strokeColor, opacity, strokeType, strokeSpacing, strokeLength } =
        data;

      const strokeW = strokeWidth.value * templateStore.scale;

      const styles: Record<string, any> = {
        fill: fill.value,
        strokeWidth: strokeW,
        stroke: strokeColor.value,
        opacity: opacity.value,
      };

      if (strokeType !== 'solid') {
        if (!strokeLength) {
          styles.strokeLinecap = 'round';
        }
        styles.strokeDasharray = `${strokeLength.value * strokeW.value},${
          strokeSpacing.value * strokeW.value
        }`;
      }

      return styles;
    });

    const computedRectWidth = computed(() => {
      const { strokeWidth, width } = data;
      return width.value - strokeWidth.value * templateStore.scale;
    });

    const computedRectHeight = computed(() => {
      const { strokeWidth, height } = data;
      return height.value - strokeWidth.value * templateStore.scale;
    });

    return { computedStyle, computedRectWidth, computedRectHeight, templateStore };
  },
});
</script>
