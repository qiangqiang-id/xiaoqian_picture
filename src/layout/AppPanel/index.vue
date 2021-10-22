<template>
  <div class="panel-container">
    <Panel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Panel from "./panel.vue";

export default defineComponent({
  name: "AppPanel",

  components: {
    Panel,
  },

  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.panel-container {
  width: 350px;
}

.icon-add {
  height: 16px;
  width: 16px;
}
</style>
