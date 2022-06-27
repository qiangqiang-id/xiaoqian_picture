<template>
  <div class="control-box" ref="control-box" :style="controlBoxStyle">
    <template v-if="!isEditing">
      <span
        v-for="item in selectPointList"
        :key="item.position"
        :class="[item.class, 'point']"
        :style="{ cursor: cursorStyle[item.cursorTypeIndex] }"
        @mousedown.stop="drawScale($event, item.position)"
      />

      <!-- 旋转区域 -->
      <div class="rotateArea" @mousedown.stop="dragRotate">
        <img src="@/assets/images/icon_rotate.png" alt="rotateIcon" />
      </div>
    </template>

    <!-- 旋转角度，预览信息-->
    <div class="rotateTips" v-show="spinStatus" :style="tipsStyle">{{ previewAngle }}°</div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, defineProps, defineComponent, PropType, inject } from 'vue';
import { POINT_LIST, INIT_ANGLE, ANGLE_CURSOR } from './constants';
import { Layer } from '@/types/layer';

defineComponent({ name: 'ControlBox' });

const prop = defineProps({
  showPointList: {
    type: Array,
    default: () => [],
  },

  info: {
    type: Object as PropType<Layer>,
  },
});

const info = inject('info');

const spinStatus = ref(false);

const previewAngle = ref(0);

const controlBoxStyle = computed(() => {
  const { width, height, left, top, angle = 0 } = info.value;

  return {
    width: `${width}px`,
    height: `${height}px`,
    transform: `translate(${left}px, ${top}px)
                  rotate(${angle}deg) `,
    transformOrigin: `50% 50%`,
  };
});

const selectPointList = computed(() => {
  if (prop.showPointList.length > 0) {
    return POINT_LIST.filter((item) => {
      return prop.showPointList.some((point) => point === item.position);
    });
  }
  return POINT_LIST;
});

const cursorStyle = computed(() => {
  let angle = info.value.angle;
  const cursors: string[] = [];
  if (angle < 0) {
    angle += 360;
  }

  INIT_ANGLE.forEach((data) => {
    const newAngle = (data + angle) % 360;
    const item = ANGLE_CURSOR.find((i) => i.start <= newAngle && i.end >= newAngle);
    item && cursors.push(item.cursor);
  });
  return cursors;
});

const tipsStyle = computed(() => {
  let angle = info.value.angle;
  return {
    transform: `translateX(-50%) rotate(${-angle}deg)`,
  };
});

const drawScale = () => {
  console.log('drawScale');
};

const dragRotate = () => {
  console.log('dragRotate');
};
</script>

<style lang="scss" scoped>
@import './pointStyle.scss';
.control-box {
  // position: absolute;
  // top: 0;
  // left: 0;
  outline: 2px solid #0f0;

  .rotateArea {
    position: absolute;
    bottom: -40px;
    left: 50%;
    width: 24px;
    height: 24px;
    pointer-events: auto;
    cursor: grab;
    background-color: #fff;
    border-radius: 50%;
    transform: translateX(-50%);
    img {
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    p {
      position: absolute;
      width: 24px;
      height: 24px;
      background: red;
    }
  }

  .rotateTips {
    position: absolute;
    bottom: -30px;
    left: 50%;
    width: 40px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background-color: #000;
  }
}
</style>
