<template>
  <router-view />
</template>

<script>
import {onMounted} from 'vue'
export default {
  setup() {
     // 检测主题
     function checkTheme(){
       var theme = localStorage.getItem("theme");
        window.document.documentElement.setAttribute(
            "data-theme",
            theme ? theme : "light"
        );
     }

    // app被挂载
    onMounted(()=>{
      // 检测主题
      checkTheme();
    })

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
