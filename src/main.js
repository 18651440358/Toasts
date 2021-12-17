import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

// 引入全局样式
import "./assets/public/style.css"

// 注册字体
import '@/assets/font/HarmonyOS_Sans_SC/font.css'
import '@/assets/font/UIcons/font.css'

// 请求
import axios from 'axios'
import VueAxios from 'vue-axios'

// 国际化
import i18n from './i18n'

// 剪贴板
import VueClipboard from 'vue-clipboard2'

// 安装tooltip
import tooltip from './components/tooltip/directive'

// 安装toasts
import toasts from './components/toasts'

app.use(toasts).use(tooltip).use(VueClipboard).use(i18n).use(store).use(router).use(VueAxios, axios).mount('#app')