import { defineStore } from 'pinia';
import { Layer } from '@/types/layer';

// Partial
// type Data<T> = {
//   [s in keyof T]: T[s];
// };

export const useLayer = defineStore('layer', {
  state: (): { layers: Array<Layer>; selectedLayers: Array<Layer> } => {
    return {
      layers: [],
      selectedLayers: [],
    };
  },

  actions: {
    addLayer(layer: Layer | Array<Layer>) {
      if (!Array.isArray(layer)) {
        layer = [layer];
      }
      this.layers.push(...layer);
    },

    addSelectedLayer(layer: Layer | Array<Layer>) {
      if (!Array.isArray(layer)) {
        layer = [layer];
      }
      this.selectedLayers = layer;
    },

    uploadLayer(data: Partial<Layer>) {
      const index = this.layers.findIndex((item) => item.id === data.id);
      if (index > -1) {
        Object.assign(this.layers[index], data);
      }
    },
  },
});
