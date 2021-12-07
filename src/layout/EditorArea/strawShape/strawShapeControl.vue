<template>
  <div>
    <ControlPanelHeade title="图形" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ControlPanelHeade from '../components/ControlPanelHeade.vue';

export default defineComponent({
  name: 'StrawShapeControl',

  components: {
    ControlPanelHeade,
  },
});
</script>
