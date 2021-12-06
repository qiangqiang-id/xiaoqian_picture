<template>
  <div class="control-container">
    <component :is="controlComponent" />
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { defineComponent } from 'vue';
import StrawImageControl from '../EditorArea/strawImage/strawImageControl.vue';
import strawShapeControl from '../EditorArea/strawShape/strawShapeControl.vue';
import strawTextControl from '../EditorArea/strawText/strawTextControl.vue';
import canvasControl from '../EditorArea/canvas/canvasControl.vue';
import useStraws from '@/store/straws';

const ENUM_CONTROL_PANEL = {
  Text: strawTextControl,
  Image: StrawImageControl,
  Shape: strawShapeControl,
};

type Panel = 'Text' | 'Image' | 'Shape';

export default defineComponent({
  name: 'AppControl',
  setup() {
    const { targetStraws } = useStraws();
    const controlComponent = computed(() => {
      if (targetStraws.length === 1) {
        const [target0] = targetStraws;

        const panel = target0.type as Panel;
        return ENUM_CONTROL_PANEL[panel];
      }
      return canvasControl;
    });

    return {
      controlComponent,
    };
  },
});
</script>

<style lang="scss" scoped>
.control-container {
  width: 280px;
}
</style>
