import { defineStore } from 'pinia';
import { Layer } from '@/types/layer';

export const useLayer = defineStore('layer', {
  state: (): { layers: Array<Layer> } => {
    return {
      layers: [],
    };
  },

  actions: {
    addLayer(layer: Layer) {
      this.layers.push(layer);
    },
  },
});
