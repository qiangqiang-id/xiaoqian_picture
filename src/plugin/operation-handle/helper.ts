import { Coordinate, PositionType } from '@/types/base';
import { Position } from '@/enum';

/**
 * 计算出圆心旋转后点的坐标
 * @param prev 旋转前的点坐标
 * @param center 旋转中心
 * @param angle 旋转的角度
 * @return 旋转后的坐标
 */
export const calcRotatedPoint = (
  prev: Coordinate,
  center: Coordinate,
  angle: number,
): Coordinate => {
  angle /= 180 / Math.PI;
  return {
    x: (prev.x - center.x) * Math.cos(angle) - (prev.y - center.y) * Math.sin(angle) + center.x,
    y: (prev.x - center.x) * Math.sin(angle) + (prev.y - center.y) * Math.cos(angle) + center.y,
  };
};

/**
 * 计算两个点之间的中心点
 * @param {Position} prev 前一个点的坐标
 * @param {Position} now 当前点的坐标
 * @return {Position} 中心点的坐标
 */
export const getMiddlePoint = (prev: Coordinate, now: Coordinate): Coordinate => {
  return {
    x: prev.x + (now.x - prev.x) / 2,
    y: prev.y + (now.y - prev.y) / 2,
  };
};

/**
 * 检测 p0 是否在 p1 与 p2 建立的矩形内
 * @param  {Object}  p0 被检测的坐标
 * @param  {Object}  p1 点1坐标
 * @param  {Object}  p2 点2坐标
 * @return {Boolean}    检测结果
 */
export const pointInRect = (p0: Coordinate, p1: Coordinate, p2: Coordinate): boolean => {
  if (p1.x > p2.x) {
    if (p0.x < p2.x) {
      return false;
    }
  } else {
    if (p0.x > p2.x) {
      return false;
    }
  }

  if (p1.y > p2.y) {
    if (p0.y < p2.y) {
      return false;
    }
  } else {
    if (p0.y > p2.y) {
      return false;
    }
  }

  return true;
};

/**
 * 判断当前的拉动点是否是中心点
 * @param position
 * @return   boolean
 */
export const isCenterPoint = (position: PositionType): boolean => {
  const centerPonitList = [
    Position.TOP_CENTER,
    Position.LEFT_CENTER,
    Position.RIGHT_CENTER,
    Position.BOTTOM_CENTER,
  ];
  return centerPonitList.includes(position);
};
