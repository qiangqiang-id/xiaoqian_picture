<template>
  <div class="layer" :id="props.data.id" :style="layerStyle" @mousedown="handleMousedown">
    <component :is="typeComponentMap[props.data.type]" :data="props.data" />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed, PropType } from 'vue';
import { Layer } from '@/types/layer';
import Text from './strawText/index.vue';
import Image from './strawImage/index.vue';
import Shape from './strawShape/index.vue';
import { useLayer } from '@/store';
import { dragAction } from '@/utils/drag';

const typeComponentMap = {
  Text,
  Image,
  Shape,
};

const layerStore = useLayer();

const props = defineProps({
  data: {
    type: Object as PropType<Layer>,
  },
});

const layerStyle = computed(() => {
  const { left, top, angle } = props.data;
  return {
    transform: `translate(${left}px,${top}px) rotate(${angle}deg)`,
  };
});

const handleMousedown = (e: MouseEvent) => {
  layerStore.addSelectedLayer([props.data]);
  dragAction(e, {
    move: (e: MouseEvent) => {
      const { left, top, id } = props.data;
      layerStore.uploadLayer({
        id,
        left: left + e.movementX,
        top: top + e.movementY,
      });
    },
  });
};
</script>

<style lang="scss" scoped>
@import url('./index.scss');
</style>
