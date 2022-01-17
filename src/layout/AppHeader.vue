<template>
  <el-header>
    <el-button @click="handlePreview">预览</el-button>
  </el-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import generateImage from '../plugin/generate-image';
export default defineComponent({
  setup() {
    function handlePreview() {
      generateImage();
    }

    return {
      handlePreview,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-header {
  text-align: start;
}
</style>
