import { layerText } from '@/types/layer';
import { FontClass } from '@/types/font';

export const defaultFontFamily: FontClass[] = [
  {
    id: 0,
    name: '默认',
    value: 'SourceHanSansSC-Normal',
    postscriptName: 'SourceHanSansSC-Normal',
    downloadUrl: 'https://prod-huawei-media.shiguangkey.com/8075e9df2b1a.otf',
    previewUrl: 'https://prod-huawei-media.shiguangkey.com/kdpv7lxupdlpoo1',
  },
];

export const defaultTextComponent: layerText = {
  id: '',
  type: 'Text',
  width: 100,
  height: 16,
  top: 0,
  left: 0,
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: 'normal',
  letterSpacing: 0,
  lineHeight: 1.2,
  opacity: 1,
  textAlign: 'left',
  color: 'rgb(0,0,0)',
  textDecoration: 'none',
  fontFamily: defaultFontFamily[0].value,
  writingMode: 'horizontal-tb',
  text: '文本内容',
  richText: '',
  stroke: [],
  shadow: [],
  gradual: [],
  glow: [],
  locked: false,
  angle: 0,
};
