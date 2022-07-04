<template>
  <div class="control-container">
    <component :is="controlComponent" />
  </div>
</template>

<script lang="ts">
// import { computed } from 'vue';
import { defineComponent } from 'vue';
// import StrawImageControl from '../EditorArea/strawImage/strawImageControl.vue';
// import strawShapeControl from '../EditorArea/strawShape/strawShapeControl.vue';
// import strawTextControl from '../EditorArea/strawText/strawTextControl.vue';
// import BarOpacity from '@/layout/EditorArea/components/BarOpacity.vue';
// import BarTool from '@/layout/EditorArea/components/BarTool.vue';
// import canvasControl from '../EditorArea/canvas/canvasControl.vue';
// import useStraws from '@/store/straws';

// const ENUM_CONTROL_PANEL = {
//   Text: strawTextControl,
//   Image: StrawImageControl,
//   Shape: strawShapeControl,
// };

// type Panel = 'Text' | 'Image' | 'Shape';

export default defineComponent({
  name: 'AppControl',

  components: {
    //   BarOpacity,
    //   BarTool,
  },

  setup() {
    // const { targetStraws } = useStraws();
    // const controlComponent = computed(() => {
    //   if (targetStraws.length === 1) {
    //     const [target0] = targetStraws;

    //     const panel = target0.type as Panel;
    //     return ENUM_CONTROL_PANEL[panel];
    //   }
    //   return canvasControl;
    // });

    // function handleInput() {
    //   console.log('chufa');
    // }

    return {
      // controlComponent,
      // handleInput,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/style/var.scss';
.control-container {
  width: 280px;
  // position: absolute;
  // top: 0;
  // right: 0;
  // bottom: 0;
  // z-index: 1;
  // background-color: #fff;

  :deep(.body) {
    padding: 16px 24px 0;

    .bar {
      margin-top: 12px;
    }

    .label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 20px;
      margin-bottom: 12px;
      font-size: 12px;
      color: #12133f;
    }

    .slider-with-unit {
      padding: 0 8px;

      .el-input-number {
        width: 40px;
      }

      .el-input__inner {
        border: none;
        padding-right: 0;
        background: transparent;
      }

      .el-input-number__decrease,
      .el-input-number__increase {
        display: none;
      }
    }

    .ui-button--plain {
      &:hover,
      &.active {
        background: rgba($--color-primary, 0.1);
      }
    }
  }
}

.tools-bar {
  padding: 12px 24px;
  border-top: 1px solid rgba(0, 0, 0, 6%);
  margin-top: 12px;

  .tool-bar {
    margin-top: 12px;
  }
}
</style>
