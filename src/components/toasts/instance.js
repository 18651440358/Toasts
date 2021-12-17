import { createApp } from 'vue';
import Toasts from './toasts'
import Bus from './toastsBus'

let instances = []
let seed = 1

const toasts = (options) => {
    // 创建父容器
    const id = `toasts_${seed++}`
    let root = document.createElement('div');
    root.setAttribute('data-id', id)
    document.body.appendChild(root)
    let ToastsConstructor = createApp(Toasts, options)
    let instance = ToastsConstructor.mount(root)
    instance.id = id
    instance.visible = true
        // 重制高度
    let verticalOffset = 0
    instances.forEach(item => {
        verticalOffset += item.$el.offsetHeight + 16
    })
    verticalOffset += 16

    instance.toastPosition.y = verticalOffset

    Bus.$on('closed', (id) => {
        if (instance.id == id) {
            removeInstance(instance)
            document.body.removeChild(root)
            ToastsConstructor.unmount();
        }
    })
    instances.push(instance)
    return instance
}

export default toasts;

const removeInstance = (instance) => {
    if (!instance) return
    let len = instances.length
    const index = instances.findIndex(item => {
        return item.id === instance.id
    })
    instances.splice(index, 1)
    if (len <= 1) return
    const h = instance.height
    for (let i = index; i < len - 1; i++) {
        instances[i].toastPosition.y = parseInt(instances[i].toastPosition.y - h - 16)
    }
}