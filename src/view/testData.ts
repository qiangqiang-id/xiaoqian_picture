import { genRandomCode } from '@/utils/tool';
import RoundRect from '@/assets/images/shape_round_rect.png';
import { defaultTextComponent } from '@/plugin/font';

export const testData = [
  {
    id: genRandomCode(),
    type: 'Image',
    top: 100,
    left: 100,
    width: 168,
    height: 112,
    locked: false,
    src: 'https://st0.dancf.com/gaoding-material/0/images/354048/20200108-213111-jqakQ.jpg',
    opacity: 1,
    format: 'jpg',
    angle: 0,
    mask: {
      top: 0,
      left: 0,
      width: 168,
      height: 112,
    },
  },
  {
    id: genRandomCode(),
    type: 'Shape',
    locked: false,
    top: 10,
    left: 20,
    width: 100,
    height: 100,
    src: RoundRect,
    fill: 'rgba(0, 0, 0, 1)',
    strokeColor: 'rgba(255, 255, 255, 0)',
    strokeWidth: 0,
    x: 0,
    y: 0,
    rx: 30,
    ry: 30,
    strokeType: 'solid',
    strokeDasharray: '',
    strokeLength: 0,
    strokeSpacing: 0,
    opacity: 1,
    angle: 0,
  },
  {
    ...defaultTextComponent,
  },
];

testData[2].id = genRandomCode();
testData[2].top = 300;
testData[2].left = 100;
