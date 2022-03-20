import { Straw } from '@/interface/straw';

export const toStrawStyle = (straw: Record<string, any>) => {
  const style = {
    width: n2px(straw.width),
    height: n2px(straw.height),
    top: n2px(straw.top),
    left: n2px(straw.left),
    transform: straw.transform,
  };
  return style;
};

/**
 * 获取值的原始类型
 */
export const toRawType = (v: number) => toString.call(v).slice(8, -1);

export const n2px = (n: number): string => {
  if (toRawType(n) === 'Number') {
    return `${n}px`;
  }
  return n + '';
};

export const isStrawElement = (el: HTMLElement | null) => el?.classList.contains('straw');

export const isGroupStraw = (straw: Straw | undefined) => straw?.type === 'group';

export const isBackgroundElement = (el: HTMLElement | null) =>
  el?.classList.contains('straw-background');

export const isInGroupElement = (el: HTMLElement | null) =>
  !el?.parentElement?.classList.contains('straw-renderer');

export const lookUpParentStrawElement = (el: HTMLElement) => {
  while (el && !el.dataset.id && !isStrawElement(el) && el.parentElement) {
    el = el.parentElement;
  }
  return el;
};

//  兼容组元素
export const lookUpTopStrawElement = (el: HTMLElement): HTMLElement => {
  el = lookUpParentStrawElement(el);

  // if (isInGroupElement(el) && el.parentElement) {
  //   return lookUpTopStrawElement(el.parentElement);
  // }

  return el;
};

export const findStrawById = (straws: Array<Straw>, id: String) => {
  if (!id) return null;

  const targetStraw = straws.find((straw) => straw.id === id);
  if (targetStraw) return targetStraw;

  // 这里是查找组的
  // for (let i = 0; i < straws.length; i += 1) {
  //   if (straws[i].straws) {
  //     targetStraw = findStrawById(straws[i].straws, id);
  //     if (targetStraw) return targetStraw;
  //   }
  // }
};
