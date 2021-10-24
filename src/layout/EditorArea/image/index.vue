<template>
  <div class="straw__image">
    <img :src="straw.src" alt="" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Image",

  props: {
    straw: {
      type: Object,
      default: () => {},
    },
  },
  setup() {},
});
</script>
