<script setup>
import WeatherShow from '../components/HomeMainComp/WeatherShow.vue';
import { ref, onMounted,watch } from 'vue';
import {useRoute} from 'vue-router'


import {storeToRefs} from 'pinia';
import {useWeatherStore} from '../stores/weather.js';
const {getCityWeather,getCityWeatherForecast} = useWeatherStore();
const {goalCity,goalCityWeatherForecast,cityList,active} = storeToRefs(useWeatherStore()); 

import {useNetworkStore} from '../stores/network.js'
const {networkLoading} = storeToRefs(useNetworkStore())

const route = useRoute();

const showAdd = ref(false)
// 检查当前城市是否添加进列表，来显示或隐藏"+"号按钮和页面保存提示
const checkShow = (city)=>{
    showAdd.value = cityList.value.some((item)=>item.city===city)
    if(showAdd.value){
        active.value = false
    }
    else{
        active.value = true
    }
    return !showAdd.value
}


onMounted(async()=>{
    // 这里是获取城市天气信息的逻辑
    goalCity.value = await getCityWeather(route.params.city)
    goalCityWeatherForecast.value = await getCityWeatherForecast(route.params.city)
})

</script>

<template>
   <div v-show="networkLoading" class="text-center text-white text-xl"><h1>正在加载天气数据...</h1></div>
   <div v-show="!networkLoading">
   <div class="flex flex-col text-white">
    <div class="p-2 text-center bg-weather-secondary">
      你正在预览{{goalCity.city}}的天气信息
      <span v-show="checkShow(route.params.city)">，可以通过右上角的"+"号按钮保存起来</span>
    </div>
    <div class="container flex flex-col text-center mt-6 gap-4">
      <h1>当日气温是：{{goalCity.temperature}}摄氏度</h1>
      <h1>当日天气是：{{ goalCity.weather }}</h1>
      <h1>当日风向是：{{goalCity.winddirection}}风</h1>
      <h1>当日风力是：{{goalCity.windpower}}级</h1>
    </div>
    <hr class="border-white border-opacity-10 mt-6">
  </div>
  <WeatherShow></WeatherShow>
  </div>
</template>
