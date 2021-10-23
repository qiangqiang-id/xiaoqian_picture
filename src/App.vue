<template>
  <AppHeader />

  <el-container>
    <AppPanel />

    <AppMain />

    <AppControl />
  </el-container>
</template>

<script lang="ts">
import AppHeader from "./layout/appHeader.vue";
import AppMain from "./layout/AppMain.vue";
import AppPanel from "./layout/AppPanel/index.vue";
import AppControl from "./layout/AppControl/index.vue";
import { defineComponent } from "vue";
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
export default defineComponent({
  name: "App",
  components: {
    AppHeader,
    AppMain,
    AppPanel,
    AppControl,
  },
  setup() {},
});
</script>

<style src="@/style/index.css"></style>
<style lang="scss">
html,
body {
  height: 100%;
  overflow: hidden;
}

.el-header {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.el-container {
  height: 100%;
}
</style>
