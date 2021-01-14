import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import '@/assets/styles/global.scss'
import mitt from 'mitt'
const emitter: any = mitt()
let app = createApp(App)
app.config.globalProperties.$emitter = emitter
app.use(router).use(store).mount('#app')

