import Moveable from 'moveable';
import useStraws from '@/state/straws';
import { GROUP_RENDER_DIRECTIONS, DEFAULT_RENDER_DIRECTIONS } from '@/constants/moveable';
import { isGroupStraw } from '@/utils/helper';

export let moveable: any = null;

let renderEditor: any = null;

export function setRenderEditorInstance(vm: any) {
  renderEditor = vm;
}

export function initMoveable(el: HTMLElement) {
  moveable = new Moveable(el, {
    target: [],
    snappable: true,
    snapCenter: true,
    dragArea: true,
    origin: false,
  });

  moveable.on('drag', onDrag);
}

function getTargetVM(target0: HTMLElement) {
  const id = target0.getAttribute('data-id') as string;
  const vm = renderEditor.$refs[id];
  console.log('vm', vm);
  return vm;
}

export function updateMoveableState() {
  const { straws } = useStraws();
  if (moveable.target.length === 0) return;
  const [target0] = moveable.target;

  const target0Straw = straws.find((straw) => straw.id === target0.dataset.id);

  const isUpdateState = target0Straw ? !target0Straw.locked : false;

  moveable.draggable = isUpdateState;
  moveable.resizable = isUpdateState;
  moveable.rotatable = isUpdateState;

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

// TODO: 分离 select 和 target
export function setMoveableTarget(target: HTMLElement[] | null) {
  // const oldTarget = moveable.target;
  // if (isEqualArray(target, oldTarget)) return;
  if (!target || !target.length) return;

  moveable.target = target;
  // targetStraws = target
  //   .map(el => straws.find(straw => straw.id === el.dataset.id))
  //   .filter(s => s);
  // selectedStraw = null;

  // const leaveTargets = difference(oldTarget, target);

  // leaveTargets.forEach(target => {
  //   const vm = getTargetVM(target);
  //   vm?.strawHooks?.moveable?.onLeaveTarget?.();
  // });

  // const enterTargets = difference(target, oldTarget);
  // enterTargets.forEach(target => {
  //   const vm = getTargetVM(target);
  //   vm?.strawHooks?.moveable?.onEnterTarget?.();
  // });

  // const mergeTargets = uniq([...target, ...oldTarget]);
  // mergeTargets.forEach(target => {
  //   const vm = getTargetVM(target);
  //   if (vm.strawHooks?.moveable?.onChangeTarget) {
  //     vm.strawHooks.moveable.onChangeTarget();
  //   }
  // });

  // straws.forEach(straw => {
  //   const vm = getTargetVMById(straw.id);
  //   vm?.strawHooks?.moveable?.onChangeTarget?.();
  // });

  updateMoveableState();
}

function onDrag() {
  console.log('cahufa');
}
