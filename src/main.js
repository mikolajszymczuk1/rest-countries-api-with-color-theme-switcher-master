import { createApp } from 'vue';

import App from './App.vue';
import store from './stores/store';
import router from './router';

import '@/assets/css/index.css';

const app = createApp(App);

app.use(store);
app.use(router);

router.isReady().then(() => {
  app.mount('#app');
});
