import {createApp} from 'vue'
import "./style.css"
import App from './App.vue'
import './samples/node-api'
import 'vuetify/styles'
import {createVuetify} from "vuetify";
import {aliases, mdi} from "vuetify/iconsets/mdi";
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import store from './store/store.js'
import {ipcMain, dialog} from 'electron'

export const app = createApp(App);
const vuetify = new createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi
        }
    }
});

app.use(vuetify);
app.use(store);

ipcMain.on('browse-folder', (event, arg) => {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }).then(result => {
        event.reply('browse-folder-reply', result.filePaths[0])
    }).catch(err => {
        console.log(err)
    });
});

app.mount('#app')
    .$nextTick(() => {
        postMessage({payload: 'removeLoading'}, '*')
    })
