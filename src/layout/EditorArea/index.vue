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
import { Straw } from '@/interface/straw';
import useStraws from '@/store/straws';

export default defineComponent({
  name: 'EditorArea',

  components: {
    StrawsRender,
  },

  setup() {
    const { width, height, overflow } = useTemplate();
    const { straws, selectedStraw, setSelectedStraw } = useStraws();

    // strawRender Dom
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

    const editorAreaStyle = computed(() => {
      return {
        width: width.value + 'px',
        height: height.value + 'px',
        overflow: overflow.value,
      };
    });

    const getSelectStraw = (event: MouseEvent): Straw | null => {
      if (event.target && isBackgroundElement(event.target as HTMLElement))
        return selectedStraw.value;
      // if (withCtrlOrShiftKey(event)) return null;

      const el = lookUpParentStrawElement(event?.target as HTMLElement);
      const id = el.dataset.id;
      const straw = id && findStrawById(straws, id);
      // if (!straw?.pid) return null;
      return straw ? straw : null;
    };

    const setSelectStraw = (straw: Straw | null) => {
      const oldStraw = selectedStraw;

      if (oldStraw.value === straw) return;

      setSelectedStraw(straw);

      if (oldStraw.value) {
        const vm = getTargetVMById(oldStraw.value.id);
        vm?.strawHooks?.moveable?.onLeaveSelected?.();
      }

      if (straw) {
        const vm = getTargetVMById(straw.id);
        vm?.strawHooks?.moveable?.onEnterSelected?.();
      }
    };

    const handleMousemove = () => {
      mousedownAndMoved = true;
      // const [target0] = mousedownTarget;

      // if (isBackgroundElement(target0) || isLockElement(target0)) return;
      setMoveableTarget(mousedownTarget);

      moveable.dragStart(mousedownEvent);
    };

    const handleMouseup = (event: MouseEvent) => {
      document.removeEventListener('mousemove', handleMousemove);
      document.removeEventListener('mouseup', handleMouseup);

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
      // const currentTarget = moveable.target;
      // let newMoveableTarget = [...currentTarget];
      const targetEl = lookUpTopStrawElement(event.target as HTMLElement);
      // TODO: 还需要做判断，是否是打组

      if (isBackgroundElement(event.target as HTMLElement)) {
        return [event.target as HTMLElement];
      }

      // const [currentTarget0] = currentTarget;
      // console.log(currentTarget0);

      // if (isBackgroundElement(event.target as HTMLElement)) return currentTarget;
      // if (isBackgroundElement(currentTarget0) && targetEl) return [targetEl];

      return [targetEl];
    };

    const handleMouseDownLeft = (event: MouseEvent) => {
      mousedownEvent = event;

      mousedownTarget = getMoveableTarget(event);

      document.addEventListener('mousemove', handleMousemove);
      document.addEventListener('mouseup', handleMouseup);
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
@import './index.scss';
</style>
