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

const handleMousemove = (e: Event) => {
  layerStore.uploadLayer({
    id: props.data.id,
    left: props.data.left + e.movementX,
    top: props.data.top + e.movementY,
  });
};
const handleMouesup = () => {
  document.removeEventListener('mousemove', handleMousemove);
  document.removeEventListener('mouseup', handleMouesup);
};

const handleMousedown = () => {
  layerStore.addSelectedLayer([props.data]);
  document.addEventListener('mousemove', handleMousemove);
  document.addEventListener('mouseup', handleMouesup);
};
</script>

<style lang="scss" scoped>
@import url('./index.scss');
</style>
