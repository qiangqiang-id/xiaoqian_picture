import { Position } from '@/enum';

/**
 * 坐标
 */
export interface Coordinate {
  x: number;
  y: number;
}

/**
 * 尺寸
 */
export interface Dimension {
  width: number;
  height: number;
}

/** 水平信息 */
export type DirectionType = 'horizontal' | 'vertical';

/**
 * 拉动点位置
 */
export type PositionType =
  | Position.LEFT_TOP
  | Position.RIGHT_TOP
  | Position.LEFT_BOTTOM
  | Position.RIGHT_BOTTOM
  | Position.TOP_CENTER
  | Position.RIGHT_CENTER
  | Position.BOTTOM_CENTER
  | Position.LEFT_CENTER;
