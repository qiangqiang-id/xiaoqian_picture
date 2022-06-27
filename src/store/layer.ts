import { defineStore } from 'pinia';
import { Layer } from '@/types/layer';

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

    addSelectedLayers(layer: Layer | Array<Layer>) {
      if (!Array.isArray(layer)) {
        layer = [layer];
      }
      this.selectedLayers = layer;
    },
  },
});
