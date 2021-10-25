<template>
  <div class="panel-image-container">
    <div>
      <div class="header">预设颜色</div>
      <ul class="color-box">
        <li
          class="color-item"
          v-for="item in colorList"
          :key="item"
          :style="`background:${item}`"
          @click="setBackgroundColor(item)"
        />
      </ul>
    </div>
    <div>
      <div class="header">图片背景</div>
      <el-button @click="handleClick" type="primary">添加背景图片</el-button>
    </div>
    <SelectFile ref="selectFileRef" :accept="fileType" @inputFile="handleInput" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SelectFile from '@/components/select-file/index.vue';
import useBackground from '@/state/background';
import { fileToBase64 } from '@/utils/tool';

import { colorList, fileType } from './options';

export default defineComponent({
  name: 'Background',

  components: {
    SelectFile,
  },

  setup() {
    const selectFileRef: any = ref(null);

    const { setBackgroundInfo } = useBackground();

    async function handleInput(e: File) {
      const base64 = await fileToBase64(e);
      setBackgroundInfo({ image: base64 as string });
    }

    function handleClick() {
      selectFileRef.value?.select?.();
    }

    function setBackgroundColor(item: string) {
      setBackgroundInfo({ color: item, image: '' });
    }

    return {
      colorList,
      selectFileRef,
      fileType,
      handleInput,
      handleClick,
      setBackgroundColor,
    };
  },
});
</script>

<style lang="scss" scoped>
.panel-image-container > div {
  padding-bottom: 10px;
}
.el-button {
  width: 200px;
  display: block;
  margin: 0 auto;
}

.header {
  padding-bottom: 4px;
  margin-bottom: 8px;
  border-bottom: 1px solid #e6e9f0;
}

.color-box {
  display: flex;
  flex-wrap: wrap;

  .color-item {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    margin: 4px 4px;
    cursor: pointer;
    &:hover {
      transform: scale(1.2);
      transition: transform 0.3s;
    }
  }
}
</style>
