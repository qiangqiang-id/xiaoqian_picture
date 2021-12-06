<template>
  <div id="editor-area" :style="editorAreaStyle">
    <StrawsRender ref="strawRenderRef" @handleMouseDownLeft="handleMouseDownLeft" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, onBeforeUnmount } from 'vue';
import StrawsRender from './StrawRender.vue';
import useTemplate from '@/store/template';
import {
  lookUpTopStrawElement,
  isBackgroundElement,
  lookUpParentStrawElement,
  findStrawById,
} from '@/utils/helper';
import {
  setStrawRenderRef,
  setMoveableTarget,
  moveable,
  initMoveable,
  getTargetVMById,
} from '@/plugin/moveable';
import { strawImage, strawText, strawShape } from '@/interface/straw';
import useStraws from '@/store/straws';

export default defineComponent({
  name: 'EditorArea',

  components: {
    StrawsRender,
  },

  setup() {
    const { width, height, overflow } = useTemplate();
    const { straws } = useStraws();

    const strawRenderRef = ref(null);

    onMounted(() => {
      setStrawRenderRef(strawRenderRef.value);
      const el = <HTMLElement>document.getElementById('editor-area');
      initMoveable(el);
    });

    onBeforeUnmount(() => {
      moveable.destroy();
    });

    let mousedownEvent: MouseEvent | null = null;
    let mousedownTarget: HTMLElement[] | null = null;
    let mousedownAndMoved = false;
    let selectedStraw: strawImage | strawText | strawShape | null = null;
    // let targetStraws: Array<strawImage | strawText | strawShape> = [];

    const editorAreaStyle = computed(() => {
      return {
        width: width.value + 'px',
        height: height.value + 'px',
        overflow: overflow.value,
      };
    });

    const getSelectStraw = (event: MouseEvent): strawImage | strawText | strawShape | null => {
      if (event.target && isBackgroundElement(event.target as HTMLElement)) return selectedStraw;
      // if (withCtrlOrShiftKey(event)) return null;

      const el = lookUpParentStrawElement(event?.target as HTMLElement);
      const id = el.dataset.id;
      const straw = id && findStrawById(straws, id);
      // if (!straw?.pid) return null;
      return straw ? straw : null;
    };

    const setSelectStraw = (straw: strawImage | strawText | strawShape | null) => {
      const oldStraw = selectedStraw;

      if (oldStraw === straw) return;

      selectedStraw = straw;

      if (oldStraw) {
        const vm = getTargetVMById(oldStraw.id);
        vm?.strawHooks?.moveable?.onLeaveSelected?.();
      }

      if (straw) {
        const vm = getTargetVMById(straw.id);
        vm?.strawHooks?.moveable?.onEnterSelected?.();
      }
    };

    const mousemove = () => {
      mousedownAndMoved = true;

      // const [target0] = mousedownTarget;

      // if (isBackgroundElement(target0) || isLockElement(target0)) return;

      setMoveableTarget(mousedownTarget);

      moveable.dragStart(mousedownEvent);
    };

    const mouseup = (event: MouseEvent) => {
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);

      if (mousedownAndMoved) {
        mousedownAndMoved = false;
      } else {
        setMoveableTarget(mousedownTarget);
        setSelectStraw(getSelectStraw(event));
      }

      mousedownEvent = null;
      mousedownTarget = null;
    };

    const getMoveableTarget = (event: MouseEvent) => {
      const target = lookUpTopStrawElement(event.target as HTMLElement);
      // TODO: 还需要做判断，是否是打组

      if (isBackgroundElement(event.target as HTMLElement)) {
        return [];
      }

      return [target];
    };

    const handleMouseDownLeft = (event: MouseEvent) => {
      mousedownEvent = event;

      mousedownTarget = getMoveableTarget(event);

      document.addEventListener('mousemove', mousemove);
      document.addEventListener('mouseup', mouseup);
    };

    return {
      editorAreaStyle,
      handleMouseDownLeft,
      strawRenderRef,
    };
  },
});
</script>

<style lang="scss" scoped>
#editor-area {
  position: relative;
}
</style>
