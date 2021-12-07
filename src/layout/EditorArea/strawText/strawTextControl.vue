<template>
  <div>
    <ControlPanelHeade title="字体" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ControlPanelHeade from '../components/ControlPanelHeade.vue';

export default defineComponent({
  name: 'StrawTextControl',

  components: {
    ControlPanelHeade,
  },
});
</script>
