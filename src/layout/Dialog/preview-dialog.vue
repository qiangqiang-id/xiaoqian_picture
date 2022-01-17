<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :model-value="props.visible"
    title="预览"
    width="30%"
    :before-close="handleClose"
  >
    <el-image :src="previewUrl" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleDownload">下载</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

import { handleSingleDownload } from '@/utils/tool';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  previewUrl: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:visible']);

function handleClose() {
  emit('update:visible', false);
}

function handleDownload() {
  handleSingleDownload(props.previewUrl);
}
</script>
