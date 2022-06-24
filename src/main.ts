import { createApp } from 'vue';
import App from './App.vue';

import ElementPlus from 'element-plus';
import '../node_modules/element-plus/packages/theme-chalk/src/index.scss';

import globalComponent from './plugin/components';
import 'virtual:svg-icons-register';

import { createPinia } from 'pinia';

const app = createApp(App);
app.use(createPinia());

app.use(ElementPlus);

app.use(globalComponent);

app.mount('#app');
