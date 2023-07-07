<script setup lang="ts">
import { onMounted, onBeforeMount, watch } from 'vue'
import { ElConfigProvider } from 'element-plus';
import { useAppStore } from '@/store/modules/app';
import { useRoute, useRouter } from "vue-router";
const Router = useRouter()
// const Route = useRoute()
// 监听当前路由变化
watch(
  () => Router.currentRoute.value,
  (path) => {
    // console.log("路由变化了", path)
    const changeSizePath = ['/login']
    console.log(path.path);
    
    if (changeSizePath.indexOf(path.path) > -1) {
      //给主进程发事件 改变窗口大小
      electron.changeSize(true)
    } else {
      //给主进程发事件 改变窗口大小
      electron.changeSize(false)
    }
  }
);
// onBeforeMount(()=>{
//     const changeSizePath = ['/login']
//     if(changeSizePath.indexOf(Route.path)>-1){
//       //给主进程发事件 改变窗口大小
//         electron.changeSize(true)
//     }else{
//         //给主进程发事件 改变窗口大小
//         electron.changeSize(false)
//     }
// })



const appStore = useAppStore();


</script>

<template>
  <el-config-provider :locale="appStore.locale" :size="appStore.size">
    <router-view />
  </el-config-provider>
</template>
