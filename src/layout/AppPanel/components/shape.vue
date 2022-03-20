<template>
  <div class="panel-image-container">
    <div @click="handleAddShape(item)" class="item" v-for="item in shapeList" :key="item.name">
      <img :src="item.src" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { shapeList, Shape } from './options';
import useStraws from '@/store/straws';
import { genRandomCode } from '@/utils/tool';

export default defineComponent({
  name: 'Shape',

  components: {},

  setup() {
    const { addStraw } = useStraws();
    function handleAddShape(item: Shape) {
      addStraw({
        id: genRandomCode(),
        type: 'Shape',
        locked: false,
        top: 10,
        left: 20,
        width: item.width,
        height: item.height,
        src: item.src,
        fill: item.fill,
        strokeColor: item.strokeColor,
        strokeWidth: item.strokeWidth,
        x: item.x,
        y: item.y,
        rx: item.rx,
        ry: item.ry,
        opacity: item.opacity,
        strokeType: item.strokeType,
        strokeDasharray: '',
        strokeLength: item.strokeLength,
        strokeSpacing: item.strokeSpacing,
      });
    }
    return { shapeList, handleAddShape };
  },
});
</script>

<style lang="scss" scoped>
.panel-image-container {
  display: flex;
  .item {
    flex: 1;
    height: 116px;
    background: #eff0f5;
    margin-left: 5px;
    cursor: pointer;
    position: relative;

    &:first-child {
      margin-right: 8px;
    }

    &:hover {
      transform: scale(1.1);
      transition: 0.3s;
    }
    img {
      display: inline-block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
