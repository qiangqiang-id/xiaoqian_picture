<template>
  <div class="header">
    <i v-if="showBack" class="el-icon-arrow-left" @click="$emit('back')" />
    <div>{{ title }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ControlPanelHeader',

  props: {
    showBack: {
      type: Boolean,
      default: false,
    },

    title: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>
.header {
  .el-icon-arrow-left {
    margin-right: 8px;
    cursor: pointer;
  }

  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 6%);
  font-size: 14px;
}
</style>
