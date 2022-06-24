<template>
  <div class="panel-image-container">
    <el-button type="primary" @click="addImage">添加图片</el-button>
    <SelectFile ref="selectFileRef" :accept="fileType" @inputFile="handleInput" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import SelectFile from '@/components/select-file/index.vue';
import { fileType } from './options';
import { strawImage } from '@/interface/straw';
import { genRandomCode, fileToBase64 } from '@/utils/tool';

export default defineComponent({
  name: 'Image',

  components: {
    SelectFile,
  },

  setup() {
    const selectFileRef: any = ref(null);

    async function transfromImageWidthAndHeight(): Promise<{ width: number; height: number }> {
      // base64: string,
      // const { width, height } = await getUploadImageWidthAndHeight(base64);
      // const targetWidth = templateWidth.value * imageWithTemplateRate;
      // const targetHeight = tempalteHeight.value * imageWithTemplateRate;
      const result = {
        height: 0,
        width: 0,
      };
      // if (targetHeight > targetWidth) {
      //   const rate = targetHeight / height;
      //   result.height = targetHeight;
      //   result.width = width * rate;
      // } else {
      //   const rate = targetWidth / width;
      //   result.height = height * rate;
      //   result.width = targetWidth;
      // }

      return result;
    }

    function addImage() {
      selectFileRef.value?.select();
    }

    async function handleInput(file: File) {
      const format = file.type.split('/')[1];
      const base64 = (await fileToBase64(file)) as string;
      const { width, height } = await transfromImageWidthAndHeight(base64);

      const imageData: strawImage = reactive({
        id: genRandomCode(),
        type: 'Image',
        top: tempalteHeight.value / 2 - height / 2,
        left: tempalteHeight.value / 2 - width / 2,
        width,
        height,
        locked: false,
        src: base64,
        opacity: 1,
        format,
        imageDatas: {
          top: 0,
          left: 0,
          width,
          height,
        },
      });
      console.log(imageData);
    }

    return {
      selectFileRef,
      addImage,
      fileType,
      handleInput,
    };
  },
});
</script>

<style lang="scss" scoped>
.panel-image-container {
  .el-button {
    width: 200px;
    display: block;
    margin: 0 auto;
  }
}
</style>
