<template>
  <div id="editor-area" class="mosaic-background" :style="editorAreaStyle">
    <div class="straws-render-container">
      <div class="editor-background" :style="backgroundStyle" />
      <LayerItem v-for="item in layers" :key="item.id" :data="item" />
    </div>

    <editBox />
  </div>
</template>

<script lang="ts">
export default {
  name: 'EditorArea',
};
</script>

<script lang="ts" setup>
import { computed } from 'vue';
import { useBackground, useTemplate, useLayer } from '@/store';
import LayerItem from './layerItem.vue';
import EditBox from './editBox/index.vue';

const backgroundStore = useBackground();
const templateStore = useTemplate();
const layerStore = useLayer();

const editorAreaStyle = computed(() => {
  return {
    width: templateStore.width + 'px',
    height: templateStore.height + 'px',
  };
});

const layers = computed(() => {
  return layerStore.layers;
});

const backgroundStyle = computed(() => {
  return {
    background: backgroundStore.color,
    backgroundImage: `url(${backgroundStore.image})`,
  };
});
</script>

<style lang="scss" scoped>
@import url('./index.scss');
</style>
