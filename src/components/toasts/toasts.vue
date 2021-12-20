<template>
<transition name="toast" @after-leave="afterLeave" @after-enter="afterEnter">
  <!-- 弹窗 -->
  <div ref="container" class="toast-container" :style="toastStyle" v-show="visible" @mouseenter="clearTimer" @mouseleave="createTimer">
    <!-- icon -->
    <template v-if="type || type != 'custom' || type != 'img'">
        <div class="toast-icon success" v-if="type==='success'">
            <i class="fi fi-br-check"></i>
        </div>
        <div class="toast-icon warning" v-if="type==='warning'">
            ?
        </div>
        <div class="toast-icon info" v-if="type==='info'">
            <i class="fi fi-sr-bell-ring"></i>
        </div>
        <div class="toast-icon error" v-if="type==='error'">
            <i class="fi fi-br-cross-small"></i>
        </div>
    </template>
    <div :style="{'backgroundColor': customIconBackground}" class="toast-icon" v-if="type==='custom'" v-html="customIcon"></div>
    <img class="toast-custom-img" :src="customImg" v-if="type==='img'"/>
    <!-- content -->
    <div class="toast-content">
        <!-- head -->
        <div class="toast-head" v-if="title">
            <!-- title -->
            <span class="toast-title">{{title}}</span>
            <!-- time -->
            <span class="toast-countdown">{{countDown}}</span>
        </div>
        <!-- body -->
        <div class="toast-body" v-if="message" v-html="message"></div>
        <!-- operate -->
        <div class="toast-operate" v-if="confirmHandle">
            <a class="toast-button-confirm" 
               :class="[{'success':type==='success'},
                        {'warning':type==='warning'},
                        {'info':type==='info'},
                        {'error':type==='error'}]"
                        @click="confirmHandle">{{confirmText}}</a>
        </div>
    </div>
    <!-- 关闭 -->
    <div v-if="closeIcon" class="toast-close"  @click="destruction">
        <i class="fi fi-rr-cross-small"></i>
    </div>
  </div>
  </transition>
</template>

<script>
import Bus from './toastsBus'
import {ref, computed, onMounted, onBeforeUnmount} from 'vue'
export default {
    props: {
        title: String,
        closeIcon: {
            type: Boolean,
            default: true
        },
        message: String,
        type: {
            type: String,
            validator: function(val) {
                return ['success', 'warning', 'info', 'error', 'custom', 'img'].includes(val);
            }
        },
        confirmText: String,
        customIcon: String,
        customIconBackground: String,
        customImg: String,
        autoClose: {
            type: Number,
            default: 4500
        },
        confirmHandle: Function,
        leaveHandle: Function
    },
    setup(props){
        // 显示
        const visible = ref(false);

        // 容器实例
        const container = ref(null);

        // 高度
        const height = ref(0);

        // 位置
        const toastPosition = ref({
            x: 16,
            y: 16
        })
        const toastStyle = computed(()=>{
            return {
                top: `${toastPosition.value.y}px`,
                right: `${toastPosition.value.x}px`,
            }
        })

        // 倒计时
        const countDown = computed(()=>{
            return '2 seconds ago'
        })

        const id = ref('')

        // 离开以后
        function afterLeave(){
            Bus.$emit('closed',id.value);
            if(props.leaveHandle)
                props.leaveHandle()
        }
        // 进入以后
        function afterEnter(){
            height.value = container.value.offsetHeight
        }

        // 定时器
        const timer = ref(null);

        // 鼠标进入
        function clearTimer(){
             if(timer.value)
                clearTimeout(timer.value)
        }
        // 鼠标移出
        function createTimer(){
           if(props.autoClose){
                timer.value = setTimeout(() => {
                    visible.value = false
                }, props.autoClose)
            }
        }

        // 销毁
        function destruction(){
            visible.value = false
        }
        
        // 主动关闭
        function close(){
            destruction();
        }

        onMounted(()=>{
            createTimer();
        })

        onBeforeUnmount(()=>{
            if(timer.value)
                clearTimeout(timer.value)
        })

        return {
            visible,
            toastPosition,
            toastStyle,
            countDown,
            afterLeave,
            afterEnter,
            clearTimer,
            createTimer,
            timer,
            destruction,
            container,
            height,
            id
        }
    }
}
</script>

<style lang="scss" scoped>
// 外部容器
.toast-container{
    width: 330px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
    background-color: rgba(#F7F7F7, .6);
    border: 1px solid #E5E5E5;
    padding: 14px 13px;
    z-index: 1001;
    position: fixed;
    top: 0;
    right: 0;
    border-radius: 10px;
    backdrop-filter: blur(15px);
    display: flex;
    align-items: stretch;
    transition: all .3s ease;
    will-change: top,left;
}
// -------------- icon --------------
.toast-icon, .toast-close{
    flex-shrink: 0;
}
.toast-icon{
    width: 30px;
    height: 30px;
    border-radius: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
// 正确
.toast-icon.success{
    background-color: rgba(#2BB44A, .15);
    color: #2BB44A;
}
// 异常
.toast-icon.warning{
    background-color: rgba(#ffcc00, .15);
    color: #F89E23;
    font-weight: 600;
    font-size: 18px;
}
// 错误
.toast-icon.error{
    font-size: 18px;
    background-color: rgba(#EB2833, .1);
    color: #EB2833;
}
// 信息
.toast-icon.info{
    background-color: rgba(#3E71F3, .1);
    color: #3E71F3;
}
// 自定义图片
.toast-custom-img{
    width: 40px;
    height: 40px;
    border-radius: 10px;
    overflow: hidden;
    flex-shrink: 0;
}
// ------------- content -----------
.toast-content{
    padding: 0 8px 0 13px;
    flex: 1;
}
// -------------- head --------------
.toast-head{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
// title
.toast-title{
    font-size: 16px;
    line-height: 24px;
    color: #191919;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
// time
.toast-countdown{
    font-size: 12px;
    color: #929292;
    line-height: 18.375px;
}
// --------------- body -----------
.toast-body{
    color: #191919;
    line-height: 21px;
    padding-top: 5px;
}
// ---------- close -------
.toast-close{
    padding: 3px;
    cursor: pointer;
    font-size: 18px;
    width: 24px;
    height: 24px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
.toast-close:hover{
    background-color: rgba(#E4E4E4, .5);
}
// --------- operate ----------
.toast-button-confirm{
    font-weight: 600;
    color: #3E71F3;
}
.toast-button-confirm:hover{
    color: #345ec9;
}
// 成功
.toast-button-confirm.success{
    color: #2BB44A;
}
.toast-button-confirm.success:hover{
    color: #218a3a;
}
// 异常
.toast-button-confirm.warning{
    color: #F89E23;
}
.toast-button-confirm.warning:hover{
    color: #df8f1f;
}
// 信息
.toast-button-confirm.info{
    color: #3E71F3;
}
.toast-button-confirm.info:hover{
    color: #345ec9;
}
// 错误
.toast-button-confirm.error{
    color: #EB2833;
}
.toast-button-confirm.error:hover{
    color: #c9101a;
}


/*动画*/
.toast-enter-from,
.toast-leave-to{
  transform: translateX(120%);
}
.v-leave-from,
.toast-enter-to{
  transform: translateX(00%);
}
</style>
