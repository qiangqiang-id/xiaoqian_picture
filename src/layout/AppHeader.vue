<template>
  <el-header>
    <el-button @click="handlePreview">预览</el-button>

    <PreviewDialog v-model:visible="previewDialogVisible" :previewUrl="previewUrl" />
  </el-header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import generateImage from '../plugin/generate-image';
import PreviewDialog from './Dialog/preview-dialog.vue';
export default defineComponent({
  name: 'AppHeader',

  components: {
    PreviewDialog,
  },

  setup() {
    const previewDialogVisible = ref(false);

    const previewUrl = ref('');

    async function handlePreview() {
      const url = await generateImage();
      previewUrl.value = url;
      previewDialogVisible.value = true;
    }

    return {
      previewDialogVisible,
      previewUrl,

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
