<template>
  <div class="edit-container" v-if="layerStore.selectedLayers.length > 0">
    <component :is="typeComponentMap[selectData.type]" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'EditBox',
};
</script>

<script lang="ts" setup>
import { computed, provide, defineComponent } from 'vue';
import Text from './textControl.vue';
import Image from './imageControl.vue';
import Shape from './shapeControl.vue';

import { useLayer } from '@/store';
const layerStore = useLayer();

defineComponent({
  name: 'EditBox',
});

const typeComponentMap = {
  Text,
  Image,
  Shape,
};

// 是否为多选;
const isMultipleSelect = computed(() => {
  return layerStore.selectedLayers.length > 1;
});

const selectData = computed(() => {
  if (!isMultipleSelect.value) return layerStore.selectedLayers[0];
  return {};
});

provide('info', selectData);
</script>

<style lang="scss" scoped>
.edit-container {
  pointer-events: none;
  width: 100%;
  height: 100%;
}
</style>
