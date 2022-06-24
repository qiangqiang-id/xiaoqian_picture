<template>
  <div id="editor-area" class="mosaic-background" :style="editorAreaStyle">
    <div class="straws-render-container">
      <div class="editor-background" :style="backgroundStyle" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useBackground } from '@/store/background';
import { useTemplate } from '@/store/template';

const backgroundStore = useBackground();
const templateStore = useTemplate();

const editorAreaStyle = computed(() => {
  return {
    width: templateStore.width + 'px',
    height: templateStore.height + 'px',
  };
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
