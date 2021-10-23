import RoundRect from "@/assets/images/shape_round_rect.png";
import Round from "@/assets/images/shape_rect.png";

export const colorList = [
  "232,221,203",
  "205,179,128",
  "3,101,100",
  "3,54,73",
  "3,22,52",
  "255,67,101",
  "252,157,153",
  "249,204,173",
  "201,200,170",
  "132,175,155",
  "17,63,61",
  "60,79,57",
  "95,92,51",
  "179,214,110",
  "248,147,29",
  "227,160,92",
  "178,190,126",
  "114,111,128",
  "57,13,49",
  "90,61,66",
];

export const fileType = [".png", ".jpg", ".gif", ".jpeg", "webp"];

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
    title: "标题",
    width: 300,
    height: 48,
    text: "双击编辑标题",
    size: 48,
    lineHeight: 1.2,
  },
  {
    title: "正文",
    width: 170,
    height: 20,
    text: "双击编辑一小段正文",
    size: 18,
    lineHeight: 1.2,
  },
];

export interface Shape {
  type: string;
  name: string;
  url: string;
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
    type: "shape",
    name: "round-rect",
    url: RoundRect,
    width: 300,
    height: 300,
    fill: "rgba(0, 0, 0, 1)",
    strokeColor: "rgba(255, 255, 255, 0)",
    strokeWidth: 0,
    x: 0,
    y: 0,
    rx: 30,
    ry: 30,
    strokeType: "solid",
    strokeLength: 0,
    strokeSpacing: 0,
    opacity: 1,
  },
  {
    type: "shape",
    name: "rect",
    url: Round,
    width: 300,
    height: 150,
    fill: "rgba(0, 0, 0, 1)",
    strokeColor: "rgba(255, 255, 255, 0)",
    strokeWidth: 0,
    x: 0,
    y: 0,
    rx: 0,
    ry: 0,
    strokeType: "solid",
    strokeLength: 0,
    strokeSpacing: 0,
    opacity: 1,
  },
];
