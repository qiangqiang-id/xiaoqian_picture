export interface PublicProp {
  id: string;
  type: string;
  locked: boolean;
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface strawText extends PublicProp {
  text: string;
  richText: string;
  fontSize: number;
  fontStyle: string;
  fontWeight: string;
  letterSpacing: number;
  lineHeight: number;
  opacity: number;
  textAlign: string;
  color: string;
  textDecoration: string;
  fontFamily?: string;
  writingMode?: string;
  stroke?: Array<Stroke>;
  shadow?: Array<Shadow>;
  gradual?: Array<Gradual>;
  glow?: Array<Glow>;
  multiTextStyle?: MultiTextStyle;
}

export interface Stroke {
  color: string;
  width: number;
  type: string;
  opacity: number;
}

export interface Shadow {
  color: string;
  angle: number;
  opacity: number;
  blur: number;
  distance: number;
  expend: number;
}

export interface Gradual {
  type: string;
  angle: number;
  opacity: number;
  scale: number;
  reverse: boolean;
  colors: Array<{
    position: number;
    value: string;
  }>;
  transparents: Array<{
    position: number;
    value: number;
  }>;
}

export interface Glow {
  color: string;
  // opacity: number;
  blur: number;
  expend: number;
}

export interface MultiTextStyle {
  styleSheets: Array<{
    fontSize: number;
    fontStyle: string;
    fontWeight: string;
    letterSpacing: number;
    lineHeight: number;
    textAlign: string;
    color: string;
    textDecoration: string;
    fontFamily?: string;
  }>;
  styleLength: Array<number>; // [1, 2]
}

export interface strawImage extends PublicProp {
  src: string;
  opacity: number;
  format: string;
  locked: boolean;
  type: string;
  imageDatas: ImageDatas;
}

export interface ImageDatas {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface strawShape extends PublicProp {
  src: string;
  fill: string;
  strokeColor: string;
  strokeWidth: number;
  x: number;
  y: number;
  rx: number;
  ry: number;
  opacity: number;
  strokeType: string;
  strokeDasharray: string;
  strokeLength: number;
  strokeSpacing: number;
}

export type Straw = strawImage | strawText | strawShape;
