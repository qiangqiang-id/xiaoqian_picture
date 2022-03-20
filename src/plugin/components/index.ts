import { App } from 'vue';
import SvgIcon from '@/components/svg-icon/index.vue';
const comps = Object.assign([SvgIcon]);

export default {
  install: (app: App) => {
    comps.forEach((comp: any) => {
      app.component(comp.name, comp);
    });
  },
};
