<template>
  <ControlPanelHeade title="图片" />

  <div class="body">
    <div class="w-full ui-button bar" @click="uploadImg">
      <svg-icon
        class="svg-placeholder-picture"
        name="placeholder-picture"
        style="margin-right: 4px"
      />
      <span>替换图片</span>
    </div>

    <div class="label" style="margin-top: 12px">容器</div>

    <!-- <div class="label" style="margin-top: 12px">背景</div> -->

    <!-- <div class="label" style="margin-top: 12px">描边</div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ControlPanelHeade from '../components/ControlPanelHeade.vue';

export default defineComponent({
  name: 'StrawImageControl',

  components: {
    ControlPanelHeade,
  },

  setup() {
    function handleEditCanvasSize() {}

    function uploadImg() {}

    return {
      handleEditCanvasSize,
      uploadImg,
    };
  },
});
</script>

<style lang="scss" scoped>
// @import '~@/element-variable.scss';
.editor-button {
  color: --color-primary;
  cursor: pointer;
}

.svg-placeholder-picture {
  width: 18px;
  height: 18px;
}
</style>
