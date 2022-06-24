import { defineStore } from 'pinia';

interface Data {
  color: string;
  image: string;
  opacity: number;
}

export const useBackground = defineStore('background', {
  state: () => {
    return {
      color: '',
      image: '',
      opacity: 1,
    };
  },

  actions: {
    setProp(data: Data) {
      Object.assign(this, data);
    },
  },
});
