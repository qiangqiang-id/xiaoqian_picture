<template>
  <div :style="rootStyle">{{ straw.text }}text</div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import { n2px } from '@/utils/helper';

// export default defineComponent({
// name: 'Text',

const props = defineProps({
  straw: { type: Object, default: () => ({}) },
});

// setup(props) {
const rootStyle = computed(() => {
  return {
    color: props.straw.color,
    fontStyle: props.straw.fontStyle,
    fontWeight: props.straw.fontWeight,
    lineHeight: props.straw.lineHeight,
    opacity: props.straw.opacity,
    textAlign: props.straw.textAlign,
    textDecoration: props.straw.textDecoration,
    fontFamily: props.straw.fontFamily,
    writingMode: props.straw.writingMode,
    fontSize: n2px(props.straw.fontSize),
    letterSpacing: n2px(props.straw.letterSpacing),
    // 画布比例缩放不能改变文字大小，故使用 scale
    // transform: `scale(${props.scale})`,
    transformOrigin: 'top left',
    // width: props.isVerticalRL ? 'auto' : n2px(props.straw.width / props.scale),
    // height: props.isVerticalRL ? n2px(props.straw.height / props.scale) : 'auto',
  };
});

function onMoveableResizeStart() {
  console.log('Start');
}

function onMoveableResize() {
  console.log('hhaa');
}

function onMoveableResizeEnd() {
  console.log('End');
}

defineExpose({
  onResizeStart: onMoveableResizeStart,
  onResize: onMoveableResize,
  onResizeEnd: onMoveableResizeEnd,
});
</script>
