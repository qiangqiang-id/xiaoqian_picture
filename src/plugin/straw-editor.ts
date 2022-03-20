import { App } from 'vue';
import createEditorArea, { StrawEditorVuePlugin } from '@packages/straw-editor/editor/index';

const editorArea = createEditorArea();

export default {
  install(app: App) {
    app.use(StrawEditorVuePlugin, editorArea);
  },
};
