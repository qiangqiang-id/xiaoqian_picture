// import useTemplate from '@/store/template';
import strawAreaCss from '@/layout/EditorArea/index.scss';

// const { width, height, scale } = useTemplate();
const width = 400;
const height = 400;
const scale = 1;
const canvas = <HTMLCanvasElement>document.createElement('canvas');
const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
canvas.width = width;
canvas.height = height;
const svgCssString = compression(strawAreaCss);

function compression(str: string) {
  return str.replace(/\n+/g, '').replace(/\/\*.+?\*\//g, '');
}

export default async function generateImage() {
  const editorArea = <HTMLElement>(
    document.querySelector('.straws-render-container')?.cloneNode(true)
  );
  const svg = domToImage(editorArea);
  return await svgToImageBlobUrl(svg);
}

function domToImage(elSkyRendererClone: HTMLElement) {
  const xmls = new XMLSerializer();
  const contentHtml = xmls.serializeToString(elSkyRendererClone);

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${width * scale}' height='${
    height * scale
  }'><style>${svgCssString}</style><foreignObject x='0' y='0' width='100%' height='100%'>${contentHtml}</foreignObject></svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

async function svgToImageBlobUrl(svg: string) {
  const image = await makeImage(svg);
  ctx?.drawImage(image, 0, 0, width, height);

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
