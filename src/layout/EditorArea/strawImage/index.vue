<template>
  <div class="straw__image">
    <img
      class="straw__image-content"
      :src="data.src"
      :style="{
        width: data.width + 'px',
        height: data.height + 'px',
      }"
    />
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
.straw__image {
  height: 100%;
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
