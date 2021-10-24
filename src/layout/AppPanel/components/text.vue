<template>
  <div class="panel-image-container">
    <div @click="handleAddText(item)" class="item" v-for="item in textList" :key="item.title">
      {{ item.title }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { Text, textList } from "./options";
import { defaultTextComponent } from "@/plugin/font";
import useStraw from "@/state/straws";
import { genRandomCode } from "@/utils/tool";

export default defineComponent({
  name: "Text",

  components: {},

  setup() {
    const { addStraw } = useStraw;

    function handleAddText(item: Text) {
      const textData = {
        id: genRandomCode(),
        top: item.height / 2,
        left: item.width / 2,
        width: item.width,
        height: item.height,
        text: item.text,
        richText: item.text,
        fontSize: item.size,
        lineHeight: item.lineHeight,
      };

      const data = reactive({ ...defaultTextComponent, ...textData });

      addStraw.value(data);
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
