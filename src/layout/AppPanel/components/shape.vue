<template>
  <div class="panel-image-container">
    <div @click="handleAddShape(item)" class="item" v-for="item in shapeList" :key="item.name">
      <img :src="item.url" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { shapeList, Shape } from "./options";

export default defineComponent({
  name: "Shape",

  components: {},

  setup() {
    function handleAddShape(item: Shape) {
      console.log(item);
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
