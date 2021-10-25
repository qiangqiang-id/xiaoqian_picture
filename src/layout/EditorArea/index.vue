<template>
  <div id="editor-area" :style="editorAreaStyle">
    <StrawsRender ref="strawRenderRef" @handleMouseDownLeft="handleMouseDownLeft" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, getCurrentInstance, onMounted } from 'vue';
import StrawsRender from './StrawRender.vue';
import useTemplate from '@/state/template';
import { lookUpTopStrawElement, isBackgroundElement } from '@/utils/helper';
import {
  setRenderEditorInstance,
  setMoveableTarget,
  moveable,
  initMoveable,
} from '@/plugin/moveable';

export default defineComponent({
  name: 'EditorArea',

  components: {
    StrawsRender,
  },

  setup() {
    const { width, height, overflow } = useTemplate();

    const vm = getCurrentInstance();
    setRenderEditorInstance(vm);

    onMounted(() => {
      const el = <HTMLElement>document.getElementById('editor-area');
      initMoveable(el);
    });

    let mousedownEvent: MouseEvent | null = null;
    let mousedownTarget: HTMLElement[] | null = null;
    let mousedownAndMoved = false;

    const strawRenderRef = ref(null);

    const editorAreaStyle = computed(() => {
      return {
        width: width.value + 'px',
        height: height.value + 'px',
        overflow: overflow.value,
      };
    });

    const mousemove = () => {
      mousedownAndMoved = true;

      // const [target0] = mousedownTarget;

      // if (isBackgroundElement(target0) || isLockElement(target0)) return;

      console.log('mousedownTarget', mousedownTarget);

      setMoveableTarget(mousedownTarget);

      moveable.dragStart(mousedownEvent);
    };

    const mouseup = () => {
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);

      if (mousedownAndMoved) {
        mousedownAndMoved = false;
      } else {
        setMoveableTarget(mousedownTarget);
        // setSelectStraw(getSelectStraw(event));
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
      console.log('target', target);
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
