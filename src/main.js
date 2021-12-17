import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 引入全局样式
import "./assets/public/style.css"

// 注册字体
import '@/assets/font/HarmonyOS_Sans_SC/font.css'
import '@/assets/font/UIcons/font.css'


// 安装toasts
import toasts from './components/toasts'

app.use(toasts).mount('#app')
