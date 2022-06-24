<template>
  <div id="editor-area" class="mosaic-background" :style="editorAreaStyle">
    <div class="edtir-background" :style="backgroundStyle" />
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
.edtir-background {
  width: 100%;
  height: 100%;
}
</style>
