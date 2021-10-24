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
  if (toRawType(n) === "Number") {
    return `${n}px`;
  }
  return n;
};
