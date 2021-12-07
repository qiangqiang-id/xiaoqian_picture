import RoundRect from '@/assets/images/shape_round_rect.png';
import Round from '@/assets/images/shape_rect.png';

export const colorList = [
  'rgb(232,221,203)',
  'rgb(205,179,128)',
  'rgb(3,101,100)',
  'rgb(3,54,73)',
  'rgb(3,22,52)',
  'rgb(255,67,101)',
  'rgb(252,157,153)',
  'rgb(249,204,173)',
  'rgb(201,200,170)',
  'rgb(132,175,155)',
  'rgb(17,63,61)',
  'rgb(60,79,57)',
  'rgb(95,92,51)',
  'rgb(179,214,110)',
  'rgb(248,147,29)',
  'rgb(227,160,92)',
  'rgb(178,190,126)',
  'rgb(114,111,128)',
  'rgb(57,13,49)',
  'rgb(90,61,66)',
];

export const fileType = ['.png', '.jpg', '.gif', '.jpeg', 'webp'];

export interface Text {
  title: string;
  width: number;
  height: number;
  text: string;
  size: number;
  lineHeight: number;
}
export const textList: Text[] = [
  {
    title: '标题',
    width: 300,
    height: 48,
    text: '双击编辑标题',
    size: 48,
    lineHeight: 1.2,
  },
  {
    title: '正文',
    width: 170,
    height: 20,
    text: '双击编辑一小段正文',
    size: 18,
    lineHeight: 1.2,
  },
];

export interface Shape {
  type: string;
  name: string;
  src: string;
  width: number;
  height: number;
  fill: string;
  strokeColor: string;
  strokeWidth: number;
  x: number;
  y: number;
  rx: number;
  ry: number;
  strokeType: string;
  strokeLength: number;
  strokeSpacing: number;
  opacity: number;
}

export const shapeList: Shape[] = [
  {
    type: 'shape',
    name: 'round-rect',
    src: RoundRect,
    width: 100,
    height: 100,
    fill: 'rgba(0, 0, 0, 1)',
    strokeColor: 'rgba(255, 255, 255, 0)',
    strokeWidth: 0,
    x: 0,
    y: 0,
    rx: 30,
    ry: 30,
    strokeType: 'solid',
    strokeLength: 0,
    strokeSpacing: 0,
    opacity: 1,
  },
  {
    type: 'shape',
    name: 'rect',
    src: Round,
    width: 100,
    height: 50,
    fill: 'rgba(0, 0, 0, 1)',
    strokeColor: 'rgba(255, 255, 255, 0)',
    strokeWidth: 0,
    x: 0,
    y: 0,
    rx: 0,
    ry: 0,
    strokeType: 'solid',
    strokeLength: 0,
    strokeSpacing: 0,
    opacity: 1,
  },
];
