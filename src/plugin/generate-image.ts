// import useTemplate from '@/store/template';
import strawAreaCss from '@/layout/EditorArea/index.scss';
import { useTemplate } from '@/store/template';

const svgCssString = compression(strawAreaCss);

function compression(str: string) {
  return str.replace(/\n+/g, '').replace(/\/\*.+?\*\//g, '');
}

export default async function generateImage() {
  const editorArea = <HTMLElement>(
    document.querySelector('.straws-render-container')?.cloneNode(true)
  );

  const svg = domToSvg(editorArea);
  return await svgToImageBlobUrl(svg);
}

function domToSvg(elSkyRendererClone: HTMLElement) {
  const templateInfo = useTemplate();
  const xmls = new XMLSerializer();
  const contentHtml = xmls.serializeToString(elSkyRendererClone);

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${
    templateInfo.width * templateInfo.scale
  }' height='${
    templateInfo.height * templateInfo.scale
  }'><style>${svgCssString}</style><foreignObject x='0' y='0' width='100%' height='100%'>${contentHtml}</foreignObject></svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

async function svgToImageBlobUrl(svg: string) {
  const templateInfo = useTemplate();

  const image = await makeImage(svg);
  const canvas = <HTMLCanvasElement>document.createElement('canvas');
  const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
  canvas.width = templateInfo.width;
  canvas.height = templateInfo.height;

  ctx?.drawImage(image, 0, 0, templateInfo.width, templateInfo.height);

  return new Promise((resolve, reject) => {
    canvas.toBlob(function (blob: Blob | null) {
      if (blob) resolve(URL.createObjectURL(blob));
      else reject();
    });
  });
}

export function makeImage(uri: string): Promise<HTMLImageElement> {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    image.onload = function () {
      resolve(image);
    };
    image.onerror = reject;
    image.src = uri;
  });
}
