<template>
  <div class="panel-image-container">
    <el-button type="primary" @click="handleClick">添加图片</el-button>
    <SelectFile ref="selectFileRef" :accept="fileType" @inputFile="handleInput" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import SelectFile from "@/components/select-file/index.vue";
import { fileType } from "./options";

export default defineComponent({
  name: "Image",

  components: {
    SelectFile,
  },

  setup() {
    const selectFileRef: any = ref(null);

    function handleClick() {
      selectFileRef.value?.select?.();
    }

    function handleInput(e: File) {
      console.log("eeee", e);
    }

    return { selectFileRef, handleClick, fileType, handleInput };
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
