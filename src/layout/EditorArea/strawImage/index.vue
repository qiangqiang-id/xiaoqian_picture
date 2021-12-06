<template>
  <div class="straw__image">
    <img class="straw__image-content" :src="straw.src" alt="" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Image',

  props: {
    straw: {
      type: Object,
      default: () => {},
    },
  },
  setup() {},
});
</script>

<style lang="scss" scoped>
.straw__image {
  height: 100%;
  position: relative;
  overflow: hidden;
  .straw__image-content {
    display: block;
    border: 0;
    width: 100%;
    height: 100%;
    -webkit-user-drag: none; // 不可拖动图片
  }
}
</style>
