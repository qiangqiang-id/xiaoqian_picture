import FileSaver from 'file-saver';

export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e: Record<string, any>) => {
      resolve(e.target.result);
    };
    // readAsDataURL
    fileReader.readAsDataURL(blob);
    fileReader.onerror = () => {
      reject(new Error('blobToBase64 error'));
    };
  });
};

export const fileToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e: Record<string, any>) => {
      resolve(e.target.result);
    };
    fileReader.readAsDataURL(file);
    fileReader.onerror = () => {
      reject(new Error('fileToBase64 error'));
    };
  });
};

/**
 * 返回一个不会重复的随机字符
 * @returns {string}
 */
const codes: any = {};
const assistForGenRandomCode = (): string =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
export const genRandomCode = () => {
  let code = assistForGenRandomCode();
  codes[code] && (code = assistForGenRandomCode());
  codes[code] = 1;
  return code;
};

export const getUploadImageWidthAndHeight = (
  base64: string,
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = base64;
    image.onload = function () {
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
    };
    image.onerror = reject;
  });
};

export const uniq = (a: Array<any>) => a.filter((item, idx, arr) => arr.indexOf(item) === idx);

// 是否是相同的数组
export const isEqualArray = (a: Array<any>, b: Array<any>): boolean =>
  a.length === b.length && uniq([...a, ...b]).length === a.length;

export const difference = (a: Array<any>, b: Array<any>) => a.filter((item) => !b.includes(item));

export const sleep = (daley = 0): Promise<undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(undefined), daley);
  });
};

export const handleSingleDownload = async (
  blobUrl: string,
  format?: string,
  name?: string,
): Promise<void> => {
  FileSaver.saveAs(blobUrl, `${name ? name : assistForGenRandomCode()}.${format ? format : 'png'}`);
};
