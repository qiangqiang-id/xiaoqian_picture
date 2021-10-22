<template>
  <ul>
    <li v-for="panel in panelList" :key="panel.value">haha</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import panelList from "./panelMap";

export default defineComponent({
  name: "Panel",
  setup() {
    return { panelList };
  },
});
</script>

<style scoped>
ul,
li {
  padding: 0;
  margin: 0;
}
</style>
