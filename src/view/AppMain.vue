<template>
  <el-main>
    <EditorArea />
  </el-main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import EditorArea from './EditorArea/index.vue';
import { useLayer } from '@/store';
import { testData } from './testData';

export default defineComponent({
  name: 'AppMain',

  components: {
    EditorArea,
  },

  mounted() {
    const layerStore = useLayer();
    layerStore.addLayer(testData);
  },
});
</script>

<style lang="scss" scoped>
.el-main {
  background: #ecf0f5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 100px;
}
</style>
