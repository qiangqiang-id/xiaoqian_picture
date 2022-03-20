<template>
  <div class="color-picker" :class="$style.colorPicker">
    <div :class="$style.panel" @click="handleClick">
      <div :class="$style.bg">
        <div :class="$style.bgInner" :style="{ background: $attrs.value }" />

        <div v-if="$attrs.value === '多种颜色'" class="multi-color f-cc">
          {{ $attrs.value }}
        </div>
      </div>
      <i v-show="props.isShowIcon" :class="$style.icon" />
    </div>

    <div class="color-picker">
      <!-- <el-color-picker
        ref="elColorPicker"
        :predefine="predefineColors"
        popper-class="color-picker__text"
        show-alpha
        v-bind="$attrs"
      /> -->

      <Sucker ref="sucker" style="display: none" @changeColor="handleChangeColor" />
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue';
import Sucker from './Sucker.vue';
// import { predefineColors } from '../constants';

const vm = getCurrentInstance().proxy;

const props = defineProps({
  isShowIcon: {
    type: Boolean,
    default: true,
  },
});

function handleClick() {
  vm.$refs.elColorPicker.handleTrigger();
  const sucker = vm.$refs.sucker.$el;
  sucker.style.display = '';

  const container = vm.$el.getElementsByClassName('el-color-dropdown__btns')[0];
  if (container && !container.contains(appendChild)) {
    container.appendChild(appendChild);
  }
}

function handleChangeColor() {
  console.log('handleChangeColor');
}
</script>

<style lang="scss" scoped>
.multi-color {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  font-size: 12px;
  border: 1px dashed rgba(18, 19, 63, 0.3);
}

:deep(.el-color-picker__trigger) {
  display: none;
}
</style>

<style module>
.colorPicker {
  position: relative;
  width: 100%;
  padding: 0 8px;
  cursor: pointer;
}

.panel {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.bg {
  position: relative;
  width: 182px;
  height: 26px;
  border-radius: 3px;
  cursor: pointer;
  border: 1px solid rgba(18, 19, 63, 0.08);
  background: linear-gradient(
      to top right,
      hsla(0, 0%, 80%, 0.4) 25%,
      transparent 0,
      transparent 75%,
      hsla(0, 0%, 80%, 0.4) 0,
      hsla(0, 0%, 80%, 0.4)
    ),
    linear-gradient(
      to top right,
      hsla(0, 0%, 80%, 0.4) 25%,
      transparent 0,
      transparent 75%,
      hsla(0, 0%, 80%, 0.4) 0,
      hsla(0, 0%, 80%, 0.4)
    );
  background-size: 8px 8px;
  background-position: 0 0, 4px 4px;
}

.bgInner {
  height: 100%;
}

.icon {
  background: url(../../../assets/images/color_ring.png) no-repeat;
  width: 24px;
  height: 24px;
}
</style>
