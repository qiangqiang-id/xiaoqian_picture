<template>
  <div class="layer" :style="layerStyle">
    <component :is="typeComponentMap[props.data.type]" :data="props.data" />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed, PropType } from 'vue';
import { Layer } from '@/types/layer';
import Text from './strawText/index.vue';
import Image from './strawImage/index.vue';
import Shape from './strawShape/index.vue';

const typeComponentMap = {
  Text,
  Image,
  Shape,
};

const props = defineProps({
  data: {
    type: Object as PropType<Layer>,
  },
});

const layerStyle = computed(() => {
  const { left, top } = props.data;
  return {
    transform: `translate(${left}px,${top}px)`,
  };
});
</script>

<style lang="scss" scoped>
@import url('./index.scss');
</style>
