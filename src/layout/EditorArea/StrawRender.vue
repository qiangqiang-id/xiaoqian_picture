<template>
  <div class="straws-render-container mosaic-background">
    <div class="straw-background" :style="renderBackground" />

    <template v-for="straw in straws" :key="straw.id">
      <StrawElement :straw="straw" v-bind="$attrs" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import background from "@/state/background";
import StrawElement from "./StrawElement.vue";
import useStraws from "@/state/straws";

export default defineComponent({
  name: "StrawsRender",

  components: {
    StrawElement,
  },

  setup() {
    const { backgroundInfo } = background;

    const renderBackground = computed(() => {
      return {
        backgroundColor: backgroundInfo.value.color,
        backgroundImage: `url(${backgroundInfo.value.image})`,
        opacity: backgroundInfo.value.opacity ?? 1,
      };
    });

    return { renderBackground, straws: useStraws.straws };
  },
});
</script>

<style lang="scss" scoped>
.straws-render-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.straw-background {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
