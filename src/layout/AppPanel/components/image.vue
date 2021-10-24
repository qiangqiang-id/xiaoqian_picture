<template>
  <div class="panel-image-container">
    <el-button type="primary" @click="addImage">添加图片</el-button>
    <SelectFile ref="selectFileRef" :accept="fileType" @inputFile="handleInput" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import SelectFile from "@/components/select-file/index.vue";
import { fileType } from "./options";
import { fileToBase64 } from "@/utils/tool";
import useStraw from "@/state/straws";
import { strawImage } from "@/interface/straw";
import { genRandomCode } from "@/utils/tool";

export default defineComponent({
  name: "Image",

  components: {
    SelectFile,
  },

  setup() {
    const { addStraw } = useStraw;
    const selectFileRef: any = ref(null);

    function addImage() {
      selectFileRef.value?.select?.();
    }

    async function handleInput(file: File) {
      const format = file.type.split("/")[1];
      const base64 = await fileToBase64(file);
      const imageData: strawImage = reactive({
        id: genRandomCode(),
        type: "Image",
        top: 10,
        left: 10,
        width: 200,
        height: 100,
        src: base64 as string,
        opacity: 1,
        format,
        imageDatas: {
          top: 0,
          left: 0,
          width: 200,
          height: 100,
        },
      });

      addStraw.value(imageData);
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
