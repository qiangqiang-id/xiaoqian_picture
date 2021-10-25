import { strawImage, strawText } from '@/interface/straw';
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

export const n2px = (n: number) => {
  if (toRawType(n) === 'Number') {
    return `${n}px`;
  }
  return n;
};

export const isStrawElement = (el: HTMLElement | null) => el?.classList.contains('straw');

export const isGroupStraw = (straw: strawImage | strawText | undefined) => straw?.type === 'group';

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
  console.log('el', el);
  el = lookUpParentStrawElement(el);

  // if (isInGroupElement(el) && el.parentElement) {
  //   return lookUpTopStrawElement(el.parentElement);
  // }

  return el;
};
