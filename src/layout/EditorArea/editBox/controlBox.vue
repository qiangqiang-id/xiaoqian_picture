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
    </template>

    <!-- 旋转区域 -->
    <div class="rotateArea" @mousedown.stop="dragRotate">
      <img src="@/assets/images/icon_rotate.png" alt="rotateIcon" />
    </div>

    <!-- 旋转角度，预览信息-->
    <div class="rotateTips" v-show="spinStatus" :style="tipsStyle">
      {{ Math.round(info.angle) }}°
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, defineProps, inject } from 'vue';
import { POINT_LIST, INIT_ANGLE, ANGLE_CURSOR } from './constants';
import { useLayer } from '@/store';
import { dragAction } from '@/utils/drag';
import { RotateHandle, ScaleHandle } from '@/plugin/operation-handle/index';
import { PositionType } from '@/types/base';

const layerStore = useLayer();

const prop = defineProps({
  showPointList: {
    type: Array,
    default: () => [],
  },
});

const info = inject('info');

const spinStatus = ref(false);

const isEditing = ref(false);

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

const drawScale = (e: MouseEvent, type: PositionType) => {
  const renderBoxInfo = document.querySelector('.straws-render-container')?.getBoundingClientRect();
  const { top, left, width, height, angle, id } = info.value;
  const scaleHandle = new ScaleHandle({ x: left, y: top, width, height, angle }, type);

  dragAction(e, {
    move: (e: MouseEvent) => {
      const mousePoint = {
        x: e.clientX - renderBoxInfo.x,
        y: e.clientY - renderBoxInfo.y,
      };

      const data = scaleHandle.handleScale(mousePoint);

      layerStore.uploadLayer({
        id,
        ...data,
      });
    },
  });
};

const dragRotate = (e: MouseEvent) => {
  let { angle, top, left, width, height, id } = info.value;
  const renderBoxInfo = document.querySelector('.straws-render-container')?.getBoundingClientRect();

  const initData = {
    angle,
    centerPoint: {
      x: left + width / 2,
      y: top + height / 2,
    },
    startMousePoint: {
      x: e.clientX - renderBoxInfo.x,
      y: e.clientY - renderBoxInfo.y,
    },
  };
  const rotateHandle = new RotateHandle(initData);

  dragAction(e, {
    move: (e: MouseEvent) => {
      spinStatus.value = true;
      const mousePoint = {
        x: e.clientX - renderBoxInfo.x,
        y: e.clientY - renderBoxInfo.y,
      };

      const angle = rotateHandle.rotateHandler(mousePoint);
      layerStore.uploadLayer({
        id,
        angle,
      });
    },
    end: () => {
      spinStatus.value = false;
    },
  });
};
</script>

<style lang="scss" scoped>
@import './pointStyle.scss';

.control-box {
  outline: 2px solid #0f0;
  cursor: move;
  user-select: none;

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
    bottom: -35px;
    left: 50%;
    width: 40px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background-color: #000;
    color: #fff;
    font-size: 12px;
  }
}
</style>
