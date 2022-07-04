<template>
  <!-- 头部 -->
  <AppHeader />
  <!-- 主体 -->
  <el-container>
    <!-- 资源区 -->
    <AppPanel />
    <!-- 画布主体区域 -->
    <AppMain />
    <!-- 工具区 -->
    <AppControl />
  </el-container>
</template>

<script lang="ts">
import AppHeader from './view/AppHeader.vue';
import AppMain from './view/AppMain.vue';
import AppPanel from './view/AppPanel/index.vue';
import AppControl from './view/AppControl/index.vue';
import { defineComponent } from 'vue';
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
export default defineComponent({
  name: 'App',

  components: {
    AppHeader,
    AppMain,
    AppPanel,
    AppControl,
  },

  setup() {
    // window.addEventListener('beforeunload', (event) => {
    //   console.log('chuga22222');
    //   const confirmationMessage = 'o/';
    //   (event || window.event).returnValue = confirmationMessage; //Gecko + IE
    //   return confirmationMessage; //Webkit, Safari, Chrome
    // });
  },
});
</script>

<style src="@/style/index.scss"></style>
<style lang="scss">
html,
body {
  height: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
}

.el-header {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.el-container {
  height: calc(100% - 60px);
}
</style>
