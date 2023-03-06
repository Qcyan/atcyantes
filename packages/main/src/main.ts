import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import shepherd from '@cyantes/shepherd'
import '@cyantes/shepherd/dist/style.css'

const app = createApp(App)

app.use(shepherd)
app.use(ElementPlus)
app.mount('#app')
