import { Position } from '@/enum';
import { Coordinate, PositionType } from '@/types/base';

interface Option {
  maxWidth?: number;
  maxHeight?: number;
  minWidth?: number;
  minHeight?: number;
  isLockProportions: boolean;
}

interface KeyVariable {
  center: Coordinate; // 元素原始中心点坐标
  handlePoint: Coordinate; // 当前拖动手柄的虚拟坐标（旋转后的坐标）
  sPoint: Coordinate; // 拖动手柄的对称点的坐标（假设拖动的是左上角手柄，那么他的对称点就是右下角的点）
  proportion: number;
}

interface StartRectData extends Coordinate {
  width: number;
  height: number;
  angle: number;
}

interface ResultData {
  top: number;
  left: number;
  width: number;
  height: number;
}

/**
 * 计算出圆心旋转后点的坐标
 * @param prev 旋转前的点坐标
 * @param center 旋转中心
 * @param angle 旋转的角度
 * @return 旋转后的坐标
 */
const calcRotatedPoint = (prev: Coordinate, center: Coordinate, angle: number): Coordinate => {
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
const getMiddlePoint = (prev: Coordinate, now: Coordinate): Coordinate => {
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
const pointInRect = (p0: Coordinate, p1: Coordinate, p2: Coordinate): boolean => {
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
const isCenterPoint = (position: PositionType): boolean => {
  const centerPonitList = [
    Position.TOP_CENTER,
    Position.LEFT_CENTER,
    Position.RIGHT_CENTER,
    Position.BOTTOM_CENTER,
  ];
  return centerPonitList.includes(position);
};

export default class ScaleHandle {
  // 当前拉伸的位置点
  private positionType: PositionType;

  // 元素信息
  private startRectData: StartRectData;

  // 旋转角度
  private rotate: number;

  // 配置信息
  private option: Option;

  constructor(
    startRectData: StartRectData,
    type: PositionType,
    option = { isLockProportions: true },
  ) {
    this.positionType = type;
    this.startRectData = startRectData;
    this.option = option;
    this.rotate = startRectData.angle;
  }

  // 拉伸
  public handleScale(mousePosition: Coordinate): ResultData {
    let result: ResultData;
    const { proportion, sPoint, handlePoint } = this.getKeyVariable();
    const { width, height } = this.startRectData;

    switch (this.positionType) {
      case Position.LEFT_TOP: {
        // 中心点坐标
        let newCenterPoint = getMiddlePoint(mousePosition, sPoint);
        // 旋转后的topleft
        let newTopLeftPoint = calcRotatedPoint(mousePosition, newCenterPoint, -this.rotate);
        // 旋转后的bottomRight
        let newBottomRightPoint = calcRotatedPoint(sPoint, newCenterPoint, -this.rotate);
        let newWidth = newBottomRightPoint.x - newTopLeftPoint.x;
        let newHeight = newBottomRightPoint.y - newTopLeftPoint.y;

        if (this.option.isLockProportions) {
          // proportion move 前的拖放比例
          // 修正 坐标 宽高
          if (newWidth / newHeight > proportion) {
            newTopLeftPoint.x += Math.abs(newWidth - newHeight * proportion);
            newWidth = newHeight * proportion;
          } else {
            newTopLeftPoint.y += Math.abs(newHeight - newWidth / proportion);
            newHeight = newWidth / proportion;
          }

          // 重新计算 topLeft
          const rotatedTopLeftPoint = calcRotatedPoint(
            newTopLeftPoint,
            newCenterPoint,
            this.rotate,
          );

          // 中心点
          newCenterPoint = getMiddlePoint(rotatedTopLeftPoint, sPoint);
          newTopLeftPoint = calcRotatedPoint(rotatedTopLeftPoint, newCenterPoint, -this.rotate);
          newBottomRightPoint = calcRotatedPoint(sPoint, newCenterPoint, -this.rotate);

          newWidth = newBottomRightPoint.x - newTopLeftPoint.x;
          newHeight = newBottomRightPoint.y - newTopLeftPoint.y;
        }

        result = {
          left: newTopLeftPoint.x,
          top: newTopLeftPoint.y,
          height: newHeight,
          width: newWidth,
        };
        break;
      }

      case Position.RIGHT_TOP: {
        let newCenterPoint = getMiddlePoint(mousePosition, sPoint);
        let newTopRightPoint = calcRotatedPoint(mousePosition, newCenterPoint, -this.rotate);
        let newBottomLeftPoint = calcRotatedPoint(sPoint, newCenterPoint, -this.rotate);

        let newWidth = newTopRightPoint.x - newBottomLeftPoint.x;
        let newHeight = newBottomLeftPoint.y - newTopRightPoint.y;

        if (this.option.isLockProportions) {
          if (newWidth / newHeight > proportion) {
            newTopRightPoint.x -= Math.abs(newWidth - newHeight * proportion);
            newWidth = newHeight * proportion;
          } else {
            newTopRightPoint.y += Math.abs(newHeight - newWidth / proportion);
            newHeight = newWidth / proportion;
          }

          const rotatedTopRightPoint = calcRotatedPoint(
            newTopRightPoint,
            newCenterPoint,
            this.rotate,
          );
          newCenterPoint = getMiddlePoint(rotatedTopRightPoint, sPoint);
          newTopRightPoint = calcRotatedPoint(rotatedTopRightPoint, newCenterPoint, -this.rotate);
          newBottomLeftPoint = calcRotatedPoint(sPoint, newCenterPoint, -this.rotate);

          newWidth = newTopRightPoint.x - newBottomLeftPoint.x;
          newHeight = newBottomLeftPoint.y - newTopRightPoint.y;
        }
        result = {
          left: newBottomLeftPoint.x,
          top: newTopRightPoint.y,
          height: newHeight,
          width: newWidth,
        };
        break;
      }

      case Position.LEFT_BOTTOM: {
        let newCenterPoint = getMiddlePoint(mousePosition, sPoint);
        let newTopRightPoint = calcRotatedPoint(sPoint, newCenterPoint, -this.rotate);
        let newBottomLeftPoint = calcRotatedPoint(mousePosition, newCenterPoint, -this.rotate);

        let newWidth = newTopRightPoint.x - newBottomLeftPoint.x;
        let newHeight = newBottomLeftPoint.y - newTopRightPoint.y;

        if (this.option.isLockProportions) {
          if (newWidth / newHeight > proportion) {
            newBottomLeftPoint.x += Math.abs(newWidth - newHeight * proportion);
            newWidth = newHeight * proportion;
          } else {
            newBottomLeftPoint.y -= Math.abs(newHeight - newWidth / proportion);
            newHeight = newWidth / proportion;
          }

          const rotatedBottomLeftPoint = calcRotatedPoint(
            newBottomLeftPoint,
            newCenterPoint,
            this.rotate,
          );
          newCenterPoint = getMiddlePoint(rotatedBottomLeftPoint, sPoint);
          newBottomLeftPoint = calcRotatedPoint(
            rotatedBottomLeftPoint,
            newCenterPoint,
            -this.rotate,
          );
          newTopRightPoint = calcRotatedPoint(sPoint, newCenterPoint, -this.rotate);

          newWidth = newTopRightPoint.x - newBottomLeftPoint.x;
          newHeight = newBottomLeftPoint.y - newTopRightPoint.y;
        }

        result = {
          left: newBottomLeftPoint.x,
          top: newTopRightPoint.y,
          height: newHeight,
          width: newWidth,
        };
        break;
      }

      case Position.RIGHT_BOTTOM: {
        let newCenterPoint = getMiddlePoint(mousePosition, sPoint);
        let newTopLeftPoint = calcRotatedPoint(sPoint, newCenterPoint, -this.rotate);
        let newBottomRightPoint = calcRotatedPoint(mousePosition, newCenterPoint, -this.rotate);

        let newWidth = newBottomRightPoint.x - newTopLeftPoint.x;
        let newHeight = newBottomRightPoint.y - newTopLeftPoint.y;

        if (this.option.isLockProportions) {
          if (newWidth / newHeight > proportion) {
            newBottomRightPoint.x -= Math.abs(newWidth - newHeight * proportion);
            newWidth = newHeight * proportion;
          } else {
            newBottomRightPoint.y -= Math.abs(newHeight - newWidth / proportion);
            newHeight = newWidth / proportion;
          }

          const rotatedBottomRightPoint = calcRotatedPoint(
            newBottomRightPoint,
            newCenterPoint,
            this.rotate,
          );
          newCenterPoint = getMiddlePoint(rotatedBottomRightPoint, sPoint);
          newBottomRightPoint = calcRotatedPoint(
            rotatedBottomRightPoint,
            newCenterPoint,
            -this.rotate,
          );
          newTopLeftPoint = calcRotatedPoint(sPoint, newCenterPoint, -this.rotate);

          newWidth = newBottomRightPoint.x - newTopLeftPoint.x;
          newHeight = newBottomRightPoint.y - newTopLeftPoint.y;
        }

        result = {
          left: newTopLeftPoint.x,
          top: newTopLeftPoint.y,
          height: newHeight,
          width: newWidth,
        };
        break;
      }

      case Position.BOTTOM_CENTER:
      case Position.TOP_CENTER: {
        const rotatedCurrentPosition = calcRotatedPoint(mousePosition, handlePoint, -this.rotate);
        const rotatedMiddlePoint = calcRotatedPoint(
          {
            x: handlePoint.x,
            y: rotatedCurrentPosition.y,
          },
          handlePoint,
          this.rotate,
        );

        const newHeight = Math.sqrt(
          Math.pow(rotatedMiddlePoint.x - sPoint.x, 2) +
            Math.pow(rotatedMiddlePoint.y - sPoint.y, 2),
        );

        const newCenter = {
          x: rotatedMiddlePoint.x - (rotatedMiddlePoint.x - sPoint.x) / 2,
          y: rotatedMiddlePoint.y + (sPoint.y - rotatedMiddlePoint.y) / 2,
        };

        result = {
          width,
          height: newHeight,
          top: newCenter.y - newHeight / 2,
          left: newCenter.x - width / 2,
        };
        break;
      }

      case Position.RIGHT_CENTER:
      case Position.LEFT_CENTER: {
        const rotatedCurrentPosition = calcRotatedPoint(mousePosition, handlePoint, -this.rotate);
        const rotatedMiddlePoint = calcRotatedPoint(
          {
            x: rotatedCurrentPosition.x,
            y: handlePoint.y,
          },
          handlePoint,
          this.rotate,
        );

        const newWidth = Math.sqrt(
          Math.pow(rotatedMiddlePoint.x - sPoint.x, 2) +
            Math.pow(rotatedMiddlePoint.y - sPoint.y, 2),
        );

        const newCenter = {
          x: rotatedMiddlePoint.x - (rotatedMiddlePoint.x - sPoint.x) / 2,
          y: rotatedMiddlePoint.y + (sPoint.y - rotatedMiddlePoint.y) / 2,
        };

        result = {
          height,
          width: newWidth,
          top: newCenter.y - height / 2,
          left: newCenter.x - newWidth / 2,
        };
        break;
      }
    }
    return this.checkBoundar(result, handlePoint, sPoint);
  }

  // 获取基本信息
  private getKeyVariable(): KeyVariable {
    const { x, y, height, width } = this.startRectData;

    const center = {
      x: x + width / 2,
      y: y + height / 2,
    };
    const handlePoint = this.getPoint(center);
    const sPoint = {
      x: center.x + Math.abs(handlePoint.x - center.x) * (handlePoint.x < center.x ? 1 : -1),
      y: center.y + Math.abs(handlePoint.y - center.y) * (handlePoint.y < center.y ? 1 : -1),
    };
    return {
      center, // 元素原始中心点坐标
      handlePoint, // 当前拖动手柄的虚拟坐标（旋转后的坐标）
      sPoint, // 拖动手柄的对称点的坐标（假设拖动的是左上角手柄，那么他的对称点就是右下角的点）
      proportion: this.option.isLockProportions ? width / height : 1, // 宽高比
    };
  }

  // 获取当前拖动点旋转后的坐标
  private getPoint(center: Coordinate): Coordinate {
    let point: Coordinate = {
      x: 0,
      y: 0,
    };
    const { x, y, height, width } = this.startRectData;
    switch (this.positionType) {
      case Position.LEFT_TOP:
        point = {
          x: x,
          y: y,
        };
        break;
      case Position.TOP_CENTER:
        point = {
          x: x + width / 2,
          y: y,
        };
        break;
      case Position.RIGHT_TOP:
        point = {
          x: x + width,
          y: y,
        };
        break;
      case Position.LEFT_BOTTOM:
        point = {
          x: x,
          y: y + height,
        };
        break;
      case Position.BOTTOM_CENTER:
        point = {
          x: x + width / 2,
          y: y + height,
        };
        break;
      case Position.RIGHT_BOTTOM:
        point = {
          x: x + width,
          y: y + height,
        };
        break;
      case Position.LEFT_CENTER:
        point = {
          x: x,
          y: y + height / 2,
        };
        break;
      case Position.RIGHT_CENTER:
        point = {
          x: x + width,
          y: center.y,
        };
        break;
    }

    return calcRotatedPoint(point, center, this.rotate);
  }

  // 检查边界值
  private checkBoundar(data: ResultData, handlePoint: Coordinate, sPoint: Coordinate): ResultData {
    let result: ResultData = data;
    const {
      maxHeight = Infinity,
      maxWidth = Infinity,
      minWidth = 20,
      minHeight = 20,
    } = this.option;
    const { left, top, width, height } = data;

    const newCenter = {
      x: left + width / 2,
      y: top + height / 2,
    };

    // 是否超过了拉伸范围
    if (
      !pointInRect(newCenter, handlePoint, sPoint) ||
      maxHeight < height ||
      maxWidth < width ||
      minWidth > width ||
      minHeight > height
    ) {
      const { currentWidth, currentHeight } = this.getWidthAndHeightInBoundar(
        data,
        handlePoint,
        sPoint,
      );
      // 还原锚点 为 0,0 的位置
      const { x: startX, y: startY, width: startW, height: startH } = this.startRectData;
      const startCenter = {
        x: startX + startW / 2,
        y: startY + startH / 2,
      };
      /**
       *  固定宽高逻辑
       *  以当拉伸点的对角点为固定点，设置固定宽高，计算固定位置。
       */
      switch (this.positionType) {
        case Position.LEFT_TOP: {
          const startRightBottomForRotated = calcRotatedPoint(
            {
              x: startX + startW,
              y: startY + startH,
            },
            startCenter,
            this.rotate,
          );

          const currentCenter = calcRotatedPoint(
            {
              x: startRightBottomForRotated.x - currentWidth / 2,
              y: startRightBottomForRotated.y - currentHeight / 2,
            },
            startRightBottomForRotated,
            this.rotate,
          );

          const currentRigthBottom = calcRotatedPoint(
            startRightBottomForRotated,
            currentCenter,
            -this.rotate,
          );
          currentRigthBottom.x -= currentWidth;
          currentRigthBottom.y -= currentHeight;

          result = {
            top: currentRigthBottom.y,
            left: currentRigthBottom.x,
            width: currentWidth,
            height: currentHeight,
          };
          break;
        }
        case Position.RIGHT_BOTTOM: {
          const startTopLeftForRotated = calcRotatedPoint(
            { x: startX, y: startY },
            startCenter,
            this.rotate,
          );

          const currentCenter = calcRotatedPoint(
            {
              x: startTopLeftForRotated.x + currentWidth / 2,
              y: startTopLeftForRotated.y + currentHeight / 2,
            },
            startTopLeftForRotated,
            this.rotate,
          );

          const currentTopLeft = calcRotatedPoint(
            startTopLeftForRotated,
            currentCenter,
            -this.rotate,
          );
          result = {
            left: currentTopLeft.x,
            top: currentTopLeft.y,
            width: currentWidth,
            height: currentHeight,
          };
          break;
        }
        case Position.TOP_CENTER:
        case Position.RIGHT_CENTER:
        case Position.RIGHT_TOP: {
          const startLeftBottomForRoated = calcRotatedPoint(
            { x: startX, y: startY + startH },
            startCenter,
            this.rotate,
          );

          const currentCenter = calcRotatedPoint(
            {
              x: startLeftBottomForRoated.x + currentWidth / 2,
              y: startLeftBottomForRoated.y - currentHeight / 2,
            },
            startLeftBottomForRoated,
            this.rotate,
          );

          const currentLeftBottom = calcRotatedPoint(
            startLeftBottomForRoated,
            currentCenter,
            -this.rotate,
          );

          currentLeftBottom.y -= currentHeight;
          result = {
            left: currentLeftBottom.x,
            top: currentLeftBottom.y,
            width: currentWidth,
            height: currentHeight,
          };
          break;
        }
        case Position.BOTTOM_CENTER:
        case Position.LEFT_CENTER:
        case Position.LEFT_BOTTOM: {
          const startRightTopForRotate = calcRotatedPoint(
            {
              x: startX + startW,
              y: startY,
            },
            startCenter,
            this.rotate,
          );

          const currentCenter = calcRotatedPoint(
            {
              x: startRightTopForRotate.x - currentWidth / 2,
              y: startRightTopForRotate.y + currentHeight / 2,
            },
            startRightTopForRotate,
            this.rotate,
          );

          const currentRigthTop = calcRotatedPoint(
            startRightTopForRotate,
            currentCenter,
            -this.rotate,
          );
          currentRigthTop.x -= currentWidth;
          result = {
            left: currentRigthTop.x,
            top: currentRigthTop.y,
            width: currentWidth,
            height: currentHeight,
          };
          break;
        }
      }
    }
    return result;
  }

  // 获取编辑值内的宽高信息
  private getWidthAndHeightInBoundar(
    data: ResultData,
    handlePoint: Coordinate,
    sPoint: Coordinate,
  ) {
    const {
      maxHeight = Infinity,
      maxWidth = Infinity,
      minWidth = 20,
      minHeight = 20,
    } = this.option;
    const { top, left, width, height } = data;
    // 限制的宽高，非等比例缩放
    let currentHeight = maxHeight < height ? maxHeight : minHeight > height ? minHeight : height;
    let currentWidth = maxWidth < width ? maxWidth : minWidth > width ? minWidth : width;

    const newCenter = {
      x: left + width / 2,
      y: top + height / 2,
    };
    // 拉伸中心点
    const yAxis = [Position.TOP_CENTER, Position.BOTTOM_CENTER];
    const xAxis = [Position.LEFT_CENTER, Position.RIGHT_CENTER];
    if (isCenterPoint(this.positionType) && !pointInRect(newCenter, handlePoint, sPoint)) {
      if (yAxis.includes(this.positionType)) {
        currentHeight = minHeight;
      }
      if (xAxis.includes(this.positionType)) {
        currentWidth = minWidth;
      }
    }
    // 等比例缩放
    if (
      !isCenterPoint(this.positionType) &&
      this.option.isLockProportions &&
      (minHeight > height || minWidth > width)
    ) {
      const { width, height } = this.startRectData;
      const rateW = minWidth / width;
      const rateH = minHeight / height;
      const maxRate = Math.max(rateH, rateW);
      if (maxRate === rateW) {
        currentWidth = minWidth;
        currentHeight = height * maxRate;
      } else {
        currentHeight = minHeight;
        currentWidth = width * maxRate;
      }
    }
    return {
      currentWidth,
      currentHeight,
    };
  }
}
