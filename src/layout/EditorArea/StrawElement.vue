<template>
  <div class="straw" :data-id="straw.id">
    <component :is="straw.type" :straw="straw" v-bind="$attrs" class="straw-main" />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { toStrawStyle } from '@/utils/helper';
import Text from './text/index.vue';
import Image from './image/index.vue';

export default defineComponent({
  name: 'StrawElement',

  components: {
    Text,
    Image,
  },

  props: {
    straw: {
      type: Object,
      default: () => {},
    },
  },

  setup(props) {
    onMounted(() => {
      const el = <HTMLImageElement>document.querySelector(`[data-id=${props.straw.id}]`);
      if (!el) return;
      Object.assign(el.style, toStrawStyle(props.straw));
    });
    return {};
  },
});
</script>

<style lang="scss">
.straw {
  position: absolute;
}
</style>
