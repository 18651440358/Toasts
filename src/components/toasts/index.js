import toast from './instance'
import Toast from './toasts.vue'

export default (app) => {
    app.component(Toast.name, Toast);
    app.config.globalProperties.$Toast = toast;
}