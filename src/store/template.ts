import { defineStore } from 'pinia';

interface Data {
  width?: number;
  height?: number;
  scale?: number;
}

export const useTemplate = defineStore('template', {
  state: () => {
    return {
      width: 400,
      height: 700,
      scale: 1,
    };
  },
  actions: {
    setProp(data: Data) {
      Object.assign(this, data);
    },
  },
});
