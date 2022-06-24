<template>
  <div id="editor-area" class="mosaic-background" :style="editorAreaStyle">1212</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useBackground } from '@/store/background';
const width = 400;
const height = 400;

const store = useBackground();

const editorAreaStyle = computed(() => {
  return {
    width: width + 'px',
    height: height + 'px',
    background: store.color,
    backgroundImage: `url(${store.image})`,
  };
});
</script>
