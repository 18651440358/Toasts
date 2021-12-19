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
          message: 'The Chaos Theme changed to <b>Dark</b>',
          autoClose: 10000,
          confirmText: '点击',
          confirmHandle: () => {
            alert(11)
          }
      })
   }
     return {
        clickHandle
     }
  },
}
</script>

<style lang="scss">
</style>
