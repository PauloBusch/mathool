import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import PrimeVue from 'primevue/config';

createApp(App)
    .use(PrimeVue)
    .use(router)
    .mount('#app');
