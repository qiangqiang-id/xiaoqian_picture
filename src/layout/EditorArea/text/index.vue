<template>
  <div>{{ straw.text }}text</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Text",

  props: {
    straw: {
      type: Object,
      default: () => {},
    },
  },
  setup() {},
});
</script>
