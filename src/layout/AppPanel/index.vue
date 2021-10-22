<template>
  <div class="panel-container">侧边栏</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppPanel",
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.panel-container {
  width: 350px;
}
</style>
