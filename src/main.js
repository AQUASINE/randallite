import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createVuetify} from "vuetify";
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.min.css'
import store from "./store/store.js";

const app = createApp(App)
const vuetify = createVuetify({
    theme: false,
    components,
    directives
})

app.use(store);
app.use(vuetify);
app.mount('#app');