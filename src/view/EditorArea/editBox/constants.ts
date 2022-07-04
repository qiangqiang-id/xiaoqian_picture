import { Position } from '@/enum/index';

// 初始指针角度
export const INIT_ANGLE = [0, 45, 90, 135];

// 角度范围对应的指针样式
export const ANGLE_CURSOR = [
  { start: 0, end: 23, cursor: 'nwse-resize' },
  { start: 338, end: 360, cursor: 'nwse-resize' },
  { start: 23, end: 68, cursor: 'ns-resize' },
  { start: 68, end: 113, cursor: 'nesw-resize' },
  { start: 113, end: 158, cursor: 'ew-resize' },
  { start: 158, end: 203, cursor: 'nwse-resize' },
  { start: 203, end: 248, cursor: 'ns-resize' },
  { start: 248, end: 293, cursor: 'nesw-resize' },
  { start: 293, end: 338, cursor: 'ew-resize' },
];

export const POINT_LIST = [
  {
    position: Position.LEFT_TOP,
    class: 'leftTop',
    cursorTypeIndex: 0,
  },
  {
    position: Position.RIGHT_TOP,
    class: 'rightTop',
    cursorTypeIndex: 2,
  },
  {
    position: Position.LEFT_BOTTOM,
    class: 'leftBottom',
    cursorTypeIndex: 2,
  },
  {
    position: Position.RIGHT_BOTTOM,
    class: 'rightBottom',
    cursorTypeIndex: 0,
  },
  {
    position: Position.TOP_CENTER,
    class: 'topChunk',
    cursorTypeIndex: 1,
  },
  {
    position: Position.RIGHT_CENTER,
    class: 'rightChunk',
    cursorTypeIndex: 3,
  },
  {
    position: Position.BOTTOM_CENTER,
    class: 'bottomChunk',
    cursorTypeIndex: 1,
  },
  {
    position: Position.LEFT_CENTER,
    class: 'leftChunk',
    cursorTypeIndex: 3,
  },
];
