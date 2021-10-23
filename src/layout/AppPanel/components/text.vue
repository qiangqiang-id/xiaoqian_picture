<template>
  <div class="panel-image-container">
    <div @click="handleAddText(item)" class="item" v-for="item in textList" :key="item.title">
      {{ item.title }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Text, textList } from "./options";

export default defineComponent({
  name: "Text",

  components: {},

  setup() {
    function handleAddText(item: Text) {
      console.log(item);
    }
    return { textList, handleAddText };
  },
});
</script>

<style lang="scss" scoped>
.panel-image-container {
  display: flex;
  justify-content: space-between;
  margin: 20px 12px;

  .item {
    flex: 1;
    height: 80px;
    background: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #000a38;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 1);
    font-size: 28px;
    font-weight: bold;

    &:hover {
      border: 1px solid rgba(204, 206, 215, 1);
    }
  }
}
</style>
