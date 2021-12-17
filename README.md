# Toasts
基于 vue3 实现的仿苹果系统侧边消息提示组件

## 源码解析
[vue3 实现仿苹果系统侧边消息提示](https://juejin.cn/post/7042114791791394824)
 
## Toasts 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- | 
|title|提示框标题(可以为空)|string|-|-|
|closeIcon|是否显示关闭按钮|Boolean|true/false|true|
|message|消息主体(可以写入html)|string|-|-|
|confirmText|按钮文字|string|-|-|
|customIcon|自定义icon图标(type必须设置为custom)|string|-|-|
|customIconBackground|自定义图标背景颜色(type必须设置为custom)|string|-|-|
|customImg|自定义图片路径(type必须设置为img)|string|-|-|
|autoClose|自动关闭时长(值小于等于0可以取消自动关闭)|number|-|4500|
|type|提示框类型|string|success/warning/info/error/custom/img| - |
