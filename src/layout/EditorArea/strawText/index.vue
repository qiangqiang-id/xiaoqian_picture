<template>
  <div :style="rootStyle">{{ data.text }}text</div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';
import { n2px } from '@/utils/helper';
import { layerText } from '@/types/layer';

const props = defineProps({
  data: { type: Object as PropType<layerText> },
});

const rootStyle = computed(() => {
  const data = props.data;
  return {
    color: data.color,
    fontStyle: data.fontStyle,
    fontWeight: data.fontWeight,
    lineHeight: data.lineHeight,
    opacity: data.opacity,
    textAlign: data.textAlign,
    textDecoration: data.textDecoration,
    fontFamily: data.fontFamily,
    writingMode: data.writingMode,
    fontSize: n2px(data.fontSize),
    letterSpacing: n2px(data.letterSpacing),
    // 画布比例缩放不能改变文字大小，故使用 scale
    // transform: `scale(${props.scale})`,
    transformOrigin: 'top left',
    // width: props.isVerticalRL ? 'auto' : n2px(props.straw.width / props.scale),
    // height: props.isVerticalRL ? n2px(props.straw.height / props.scale) : 'auto',
  };
});
</script>
