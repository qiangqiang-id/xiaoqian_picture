<template>
  <div id="editor-area" :style="editorAreaStyle">
    <StrawsRender />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import StrawsRender from "./StrawRender.vue";
export default defineComponent({
  name: "EditorArea",

  components: {
    StrawsRender,
  },

  setup() {
    const editorAreaStyle = computed(() => {
      return {
        width: "500px",
        height: "500px",
        overflow: "visible",
      };
    });
    return {
      editorAreaStyle,
    };
  },
});
</script>

<style lang="scss" scoped>
#editor-area {
  position: relative;
}
</style>
