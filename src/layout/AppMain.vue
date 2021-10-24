<template>
  <el-main>
    <EditorArea />
  </el-main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EditorArea from "./EditorArea/index.vue";

export default defineComponent({
  name: "AppMain",

  components: {
    EditorArea,
  },
});
</script>

<style lang="scss" scoped>
.el-main {
  background: #ecf0f5;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
