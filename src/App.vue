<template>
  <div>
    <button @click="clickHandle">弹出消息</button>
  </div>
</template>

<script>
import {getCurrentInstance} from 'vue'
export default {
  setup() {
   const instance = getCurrentInstance()

   fucntion clickHandle(){
      instance.appContext.config.globalProperties.$Toast({
          type: 'success',
          message: 'The Chaos Theme changed to <b>Dark</b>'
        })
   }
     return {
        checkTheme
     }
  },
}
</script>

<style lang="scss">
@import "./assets/theme/handle";
// 公共样式
body{
  @include color(mainColor);
}
</style>
