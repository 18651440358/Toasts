# Toasts
基于 vue3 实现的仿苹果系统侧边消息提示组件

## 源码解析
[vue3 实现仿苹果系统侧边消息提示](https://juejin.cn/post/7042114791791394824)
 
## Toasts 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- | 
|title|提示框标题(可以为空)|string|-|-|
|message|消息主体(可以写入html)|string|-|-|
|closeIcon|是否显示关闭按钮|Boolean|true/false|true|
|customIcon|自定义icon图标(type必须设置为custom)|string|-|-|
|customIconBackground|自定义图标背景颜色(type必须设置为custom)|string|-|-|
|customImg|自定义图片路径(type必须设置为img)|string|-|-|
|autoClose|自动关闭时长(值小于等于0可以取消自动关闭)|number|-|4500|
|confirmText|按钮文字|string|-|-|
|confirmHandle|按钮触发事件|function|-|-|
|type|提示框类型|string|success/warning/info/error/custom/img| - |
|leaveHandle|Toasts离开后的回调|function|-|-|

## 在main.js注册 Toasts
```js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 安装toasts
import toasts from './components/toasts'

app.use(toasts).mount('#app')
```
## 使用 toasts
 ```vue
 <template>
   <button @click="clickHandle">弹出提示框</button>
 </template>
 <script>
 import {getCurrentInstance} from 'vue'
 export default { 
     setup(){
       const instance = getCurrentInstance()
       
       function clickHandle(){
         instance.appContext.config.globalProperties.$Toast({
             type: 'warning',
             title: '删除失败',
             message: '请检查您的权限, <a href="#" style="color: #6C5DD3">权限管理</a>.',
             autoClose: 10000,
             confirmText: '已阅读',
             confirmHandle: () => {
                alert('阅读完成!')
             },
             leaveHandle: () => {
                alert('Toasts 离开了')
             }
         })
       }
       
       return {
         clickHandle
       }
     }
 }
 </script>
 ```
