<template>
  <label class="slider-with-unit">
    <slot name="label">
      <span class="slider-label">{{ label }}</span>
    </slot>

    <el-slider :max="max" :min="min" v-bind="$attrs" size="small" />

    <el-input-number :controls="false" :min="min" :max="max" v-bind="$attrs" />
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SliderWithUnit',

  props: {
    label: {
      default: '',
      type: String,
    },

    max: {
      default: 500,
      type: Number,
    },

    min: {
      default: 0,
      type: Number,
    },
  },

  setup() {},
});
</script>

<style lang="scss" scoped>
.slider-with-unit {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  width: 100%;

  .slider-label {
    width: 42px;
    font-size: 12px;
  }

  .el-slider {
    flex: 1;
    padding: 0 8px;
  }
}
</style>

<style lang="scss">
$mainColor: #5b53ff;
.slider-with-unit {
  .el-input-number {
    width: 50px;

    .el-input__inner {
      border: none;
      padding: 0 !important;
    }
  }

  .el-slider {
    width: 100px;
    .el-slider__runway {
      height: 2px;
      .el-slider__bar {
        height: 2px;
        background-color: $mainColor;
      }
      .el-slider__button {
        width: 14px;
        height: 14px;
        border-color: $mainColor;
      }
      .el-slider__button-wrapper {
        top: -17px;
      }
    }
  }
}
</style>
