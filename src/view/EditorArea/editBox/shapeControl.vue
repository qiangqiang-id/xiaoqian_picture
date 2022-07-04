<template>
  <div class="shape-control">
    <ControlBox />
  </div>
</template>

<script lang="ts" setup>
import ControlBox from './controlBox.vue';
</script>

<style lang="scss" scoped>
.shape-control {
  pointer-events: none;
  width: 100%;
  height: 100%;
}
</style>
