<template>
  <label class="slider-with-unit">
    <slot name="label">
      <span class="slider-label">{{ label }}</span>
    </slot>

    <el-slider :max="max" :min="min" v-bind="$attrs" />

    <el-input-number controls-position="right" :min="min" :max="max" v-bind="$attrs" />
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
.slider-with-unit {
  .el-input-number {
    width: 60px;

    .el-input-number__decrease,
    .el-input-number__increase {
      width: 16px;
    }

    .el-input {
      .el-input__inner {
        padding-left: 0;
        padding-right: 16px;
      }
    }
  }
}
</style>
