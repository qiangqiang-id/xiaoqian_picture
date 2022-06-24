import { App } from 'vue';
import createEditorArea, { StrawEditorVuePlugin } from '@packages/straw-editor/editor/index';

const editorArea = new createEditorArea();

export default {
  install(app: App) {
    app.use(StrawEditorVuePlugin, editorArea);
  },
};
