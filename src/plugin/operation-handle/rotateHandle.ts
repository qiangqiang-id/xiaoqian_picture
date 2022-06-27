import { Coordinate } from '@/types/base';

interface InitData {
  angle: number; // 开始角度
  startMousePoint: Coordinate; // 开始鼠标位置
  centerPoint: Coordinate; // 旋转中心点
}

export default class RotateHandle {
  private initData: InitData;
  constructor(initData: InitData) {
    this.initData = initData;
  }
  rotateHandler(mousePoint: Coordinate): number {
    const { angle: startAngle, startMousePoint, centerPoint } = this.initData;
    // 旋转前的角度
    const rotateDegreeBefore =
      Math.atan2(startMousePoint.y - centerPoint.y, startMousePoint.x - centerPoint.x) /
      (Math.PI / 180);
    // 旋转后的角度
    const rotateDegreeAfter =
      Math.atan2(mousePoint.y - centerPoint.y, mousePoint.x - centerPoint.x) / (Math.PI / 180);
    // 获取旋转的角度值， startRotate 为初始角度值
    return rotateDegreeAfter - rotateDegreeBefore + startAngle;
  }
}
