<template>
  <div class="layer-image">
    <img class="layer-image-content" :src="data.src" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Image',

  props: {
    data: {
      type: Object,
    },
  },
  setup(props, content) {
    console.log(123123, props, content);
  },
});
</script>

<style lang="scss" scoped>
.layer-image {
  height: 100%;
  overflow: hidden;

  .layer-image-content {
    display: block;
    border: 0;
    width: 100%;
    height: 100%;
    -webkit-user-drag: none; // 不可拖动图片
    user-select: none;
  }
}
</style>
