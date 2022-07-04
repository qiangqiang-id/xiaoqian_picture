<template>
  <div class="canvas-control-style_container">
    <ControlPanelHeade title="画布" />

    <div class="body">
      <div class="label">
        <div>作品尺寸</div>
        <div class="editor-button" @click="handleEditCanvasSize">编辑</div>
      </div>

      <div @click="handleEditCanvasSize">
        <el-input :modelValue="`${width} x ${height}`" readonly />
      </div>

      <div class="label" style="margin-top: 12px">背景</div>
    </div>

    <!-- <div class="bar"> -->
    <ColorPicker :value="color ? color : ''" @active-change="changeColor" />
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ControlPanelHeade from '../EditorArea/components/ControlPanelHeade.vue';
import ColorPicker from '../EditorArea/components/ColorPicker.vue';
import useTemplate from '@/store/template';
import useBackground from '@/store/background';

export default defineComponent({
  name: 'StrawCanvasControl',

  components: {
    ControlPanelHeade,
    ColorPicker,
  },

  setup() {
    const { width, height } = useTemplate();
    const { color } = useBackground();

    function handleEditCanvasSize() {}

    function changeColor() {}

    return {
      handleEditCanvasSize,
      changeColor,

      width,
      height,
      color,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/style/var.scss';
.editor-button {
  color: $--color-primary;
  cursor: pointer;
}
</style>
