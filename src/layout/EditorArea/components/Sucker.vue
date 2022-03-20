<template>
  <div id="sucker" class="sucker-container">
    <svg-icon
      :name="`sucker-${visible ? 'open' : 'close'}`"
      class="sucker-icon"
      @click="openSucker"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import useSucker from '@/componsitions/useSucker';
// import { assistForGenRandomCode } from '@/utils/tool';
import { assistForGenRandomCode } from '@/utils/tool';

const { visible, color, id: suckerId } = useSucker();

const id = ref(null);

watch(visible, (value) => {
  if (value) return;
  if (!suckerId.value) return;
  if (suckerId.value !== id.value) return;

  context.emit('change-color', color.value);
});

function openSucker() {
  visible.value = true;
  id.value = suckerId.value = assistForGenRandomCode();
}
</script>

<style lang="scss" scoped>
.sucker-container {
  margin-left: 30px;
  float: left;
}
.sucker-icon {
  width: 25px;
  height: 25px;
  border-radius: 5px;
  font-size: 20px;
  &:hover {
    background-color: #eee;
  }
}
</style>
