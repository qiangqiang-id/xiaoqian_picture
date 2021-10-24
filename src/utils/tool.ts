export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e: Record<string, any>) => {
      resolve(e.target.result);
    };
    // readAsDataURL
    fileReader.readAsDataURL(blob);
    fileReader.onerror = () => {
      reject(new Error("blobToBase64 error"));
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
      reject(new Error("fileToBase64 error"));
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
