import Moveable, { OnResizeStart, OnResizeEnd, OnResize, OnDrag, OnDragEnd } from 'moveable';
import useStraws from '@/store/straws';
import {
  GROUP_RENDER_DIRECTIONS,
  DEFAULT_RENDER_DIRECTIONS,
  DIRECTIONS_ENUM,
} from '@/constants/moveable';
import { isGroupStraw, n2px } from '@/utils/helper';
import { isEqualArray, difference, uniq, sleep } from '@/utils/tool';
import { Straw } from '@/interface/straw';

export let moveable: any = null;
let strawRender: any = null;
const { straws, setSelectedStraw, setTargetStraws, editStraw } = useStraws();

export function setStrawRenderRef(vm: any) {
  strawRender = vm;
}

export async function updateMoveableState() {
  if (moveable.target.length === 0) return;
  const [target0] = moveable.target;

  const target0Straw = straws.find((straw) => straw.id === target0.dataset.id);

  const flag = target0Straw ? !target0Straw.locked : false;

  moveable.draggable = flag;
  moveable.resizable = flag;
  moveable.rotatable = flag;

  if (target0Straw) {
    if (moveable.target.length > 1) {
      // THINK: configuable?
      moveable.renderDirections = GROUP_RENDER_DIRECTIONS;
    } else {
      const target0VM = getTargetVM(target0);
      moveable.renderDirections =
        target0VM?.strawHooks?.moveable?.renderDirections ?? DEFAULT_RENDER_DIRECTIONS;
    }
    moveable.passDragArea = !moveable;
  } else {
    // 背景 | 其它 -> 开启点击穿透
    moveable.passDragArea = true;
  }

  const className = [];
  if (target0Straw?.locked) className.push('locked');
  if (isGroupStraw(target0Straw)) className.push('group');

  moveable.className = className.join(' ');
}

export function initMoveable(el: HTMLElement) {
  moveable = new Moveable(el, {
    target: [],
    snappable: true,
    snapCenter: true,
    // dragArea: true,
    origin: false,
  });

  moveable.on('drag', onDrag);
  moveable.on('dragEnd', onDragEnd);
  moveable.on('resizeStart', onResizeStart);
  moveable.on('resize', onResize);
  moveable.on('resizeEnd', onResizeEnd);
}

export function getTargetVM(target0: HTMLElement) {
  const id = target0.getAttribute('data-id') as string;
  const vm = strawRender.$refs[id];
  return vm;
}

export function getTargetVMById(id: string) {
  const vm = strawRender.$refs[id];
  return vm;
}

// TODO: 分离 select 和 target
export async function setMoveableTarget(target: HTMLElement[] | null) {
  const oldTarget = moveable.target;
  const { straws } = useStraws();

  if (isEqualArray(target as Array<any>, oldTarget)) return;

  if (!target || !target.length) return;

  moveable.target = target;

  await sleep();

  const list: Array<Straw | undefined> = target
    .map((el) => straws.find((straw) => straw.id === el.dataset.id))
    .filter((s) => s);
  const targets = list ? list : [];

  setTargetStraws(targets as Array<Straw>);
  setSelectedStraw(null);

  const leaveTargets = difference(oldTarget, target);

  leaveTargets.forEach((target) => {
    const vm = getTargetVM(target);
    vm?.strawHooks?.moveable?.onLeaveTarget?.();
  });

  const enterTargets = difference(target, oldTarget);
  enterTargets.forEach((target) => {
    const vm = getTargetVM(target);
    vm?.strawHooks?.moveable?.onEnterTarget?.();
  });

  const mergeTargets = uniq([...target, ...oldTarget]);

  mergeTargets.forEach((target) => {
    const vm = getTargetVM(target);
    if (vm.strawHooks?.moveable?.onChangeTarget) {
      vm.strawHooks.moveable.onChangeTarget();
    }
  });

  straws.forEach((straw) => {
    const vm = getTargetVMById(straw.id);
    vm?.strawHooks?.moveable?.onChangeTarget?.();
  });

  updateMoveableState();
}

function onDrag(event: OnDrag) {
  const { target, top, left } = event;
  target.style.top = n2px(top);
  target.style.left = n2px(left);

  target.dataset.id && editStraw(target.dataset.id, { top, left });

  const targetVM = getTargetVM(target as HTMLElement);
  targetVM?.strawHooks?.moveable?.onDrag?.(event);
}

function onDragEnd(event: OnDragEnd) {
  const targetVM = getTargetVM(event.target as HTMLElement);
  targetVM?.strawHooks?.moveable?.onDragEnd?.(event);
}

function onResizeStart(event: OnResizeStart) {
  const { target, datas, direction } = event;
  datas.startTop = (target as HTMLElement).offsetTop;
  datas.startLeft = (target as HTMLElement).offsetLeft;
  datas.startWidth = (target as HTMLElement).offsetWidth;
  datas.startHeight = (target as HTMLElement).offsetHeight;

  // datas.isGroup = isGroupElement(target);

  const targetVM = getTargetVM(target as HTMLElement);
  datas.targetVM = targetVM;

  moveable.keepRatio = targetVM?.strawHooks?.moveable?.keepRatio?.includes(
    DIRECTIONS_ENUM[direction.join()],
  );

  targetVM?.strawHooks?.moveable?.onResizeStart?.(event);
}

function onResize(event: OnResize) {
  /**
   * nw      n      ne
   * [-1,-1] [0,-1] [1,-1]
   * w              e
   * [-1, 0] [0, 0] [1, 0]
   * sw      s      se
   * [-1, 1] [0, 1] [1, 1]
   */

  const { target, width, height, drag, datas } = event;

  datas.scale = [width / datas.startWidth, height / datas.startHeight];

  target.style.width = n2px(width);
  target.style.height = n2px(height);

  // const straw = straws.find((straw) => straw.id === target.dataset.id);
  // straw.width = width;
  // straw.height = height;

  target.dataset.id && editStraw(target.dataset.id, { width, height });

  // if (datas.isGroup) {
  // target.firstElementChild.style.transform = `scale(${datas.scale[0]}, ${datas.scale[1]})`;
  // target.firstElementChild.style.transformOrigin = 'left top';
  // }

  datas.targetVM?.strawHooks?.moveable?.onResize?.(event);

  onDrag(drag);
}

function onResizeEnd(event: OnResizeEnd) {
  const { target, datas } = event;

  if (!target.dataset.id) return;
  // const straw = findStrawById(straws, target.dataset.id);

  // const update = (straws) => {
  straws.forEach((straw) => {
    straw.top = straw.top * datas.scale[1];
    // straw.left = straw.left * datas.scale[0];
    // straw.width = straw.width * datas.scale[0];
    // straw.height = straw.height * datas.scale[1];

    // const el = document.querySelector(`[data-id='${straw.id}']`);

    // el.style.top = n2px(straw.top);
    // el.style.left = n2px(straw.left);
    // el.style.width = n2px(straw.width);
    // el.style.height = n2px(straw.height);

    // if (isGroupElement(el)) {
    // update(straw.straws);
    // } else {
    const vm = getTargetVMById(straw.id);
    vm?.strawHooks?.moveable?.onResizeEndInGroup?.(event);
    // }
  });
  // };

  // if (datas.isGroup) {
  //   target.firstElementChild.style.transform = '';
  //   target.firstElementChild.style.transformOrigin = '';
  //   update(straw.straws);
  // }

  datas?.targetVM?.strawHooks?.moveable?.onResizeEnd?.(event);
}
