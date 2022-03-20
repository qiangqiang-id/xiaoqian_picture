<template>
  <div class="straw" :data-id="straw.id">
    <component ref="strawRef" :is="straw.type" :straw="straw" v-bind="$attrs" class="straw-main" />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { toStrawStyle } from '@/utils/helper';
import Text from './strawText/index.vue';
import Image from './strawImage/index.vue';
import Shape from './strawShape/index.vue';

export default defineComponent({
  name: 'StrawElement',

  components: {
    Text,
    Image,
    Shape,
  },

  props: {
    straw: {
      type: Object,
      default: () => {},
    },
  },

  setup(props) {
    const strawRef = ref(null);
    onMounted(() => {
      const el = <HTMLElement>document.querySelector(`[data-id=${props.straw.id}]`);
      if (!el) return;
      Object.assign(el.style, toStrawStyle(props.straw));
    });
    return {
      strawRef,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
