<script setup>
import { ref, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { RouterView, useRoute } from 'vue-router'

import { storeToRefs } from 'pinia'
import { useWeatherStore } from '../stores/weather.js'
const { getLocalWeather, getCityWeather,addCity } = useWeatherStore()
const { localCity, goalCity, LocalWeatherForecast,cityList, active} = storeToRefs(useWeatherStore())

const route = useRoute()
const showWindow = ref(false)

const handleAddCity = () => {
  if (route.params.city) {
    // 1. 构建一个对象, 将对象传递给store
    const res = cityList.value.find((item) => item.city === route.params.city)
    if (res) {
      active.value = false
    }
    console.log(goalCity.value.temperature)
    const city = {
      id: uuidv4(),
      adcode: route.params.adcode,
      city: route.params.city,
      weather: goalCity.value.temperature
    }
    // 2. 调用store的addCity方法
    addCity(city)
  }
}

onMounted(() => {
  getLocalWeather()
  getCityWeather(route.params.city)
})
</script>

<template>
  <div class="flex flex-col min-h-screen bg-weather-primary">
    <header class="bg-weather-primary shadow-lg sticky top-0 z-10">
      <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
        <a href="/weather" class="router-link-active router-link-exact-active" aria-current="page">
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-sun text-2xl"></i>
            <p class="text-2xl">新中地天气</p>
          </div>
        </a>
        <div class="flex gap-4 items-center">
          <h4 class="text-lg">{{ localCity.city }}</h4>
          <span class="text-sm"
            >实时天气：{{ localCity.weather }} {{ localCity.temperature }}°C</span
          >
          <span class="text-sm">{{ localCity.winddirection }}风{{ localCity.windpower }}级</span>
        </div>
        <div class="flex gap-3 flex-1 justify-end">
          <i
            @click="showWindow = true"
            class="fa-solid fa-circle-info text-xl hover:text-sky-900 cursor-pointer duration-1000"
          ></i>
          <i
            v-show="active"
            @click="handleAddCity"
            class="fa-solid fa-plus text-xl hover:text-sky-900 cursor-pointer duration-1000"
          ></i>
        </div>
      </nav>
    </header>
    <RouterView></RouterView>
  </div>
  <!-- i点击后的弹窗 -->
  <Transition name="fade">
  <div
    v-show="showWindow"
    class="fixed z-20 w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8 text-black"
  >
  
    <div class="p-4 bg-white self-start mt-32 max-w-screen-md">
      <h2>关于:</h2>
      <p class="text-xs mb-4">这个应用可以用来追踪你选择城市的当前天气</p>
      <h2>如何使用:</h2>
      <p class="text-xs mb-4">
        1.点击搜索框输入你希望追踪的城市<br />
        2.在搜索结果中选中一个城市，你将获取当地最新的天气<br />
        3.点击右侧的＋号可以将追踪城市的天气情况保存在首页
      </p>
      <h2>移除城市:</h2>
      <p class="text-xs">如果你不想在首页关注某个城市,可以通过底部的按钮删<br />除它</p>
      <button @click="showWindow = false" class="text-white mt-8 bg-weather-primary py-2 px-6 text-xs">关闭</button>
    </div>

  </div>
  </Transition>
</template>

<style scoped>
    .fade-enter-active{
      animation: fade 0.8s linear;
    }
    .fade-leave-active {
      transition: opacity 0.5s;
    }
   .fade-enter-from, .fade-leave-to {
      opacity: 0;
    }
    @keyframes fade {
        0% {
            transform: translateY(-100%);
        }
        25%{
            transform: translateY(0);
        }
        37.5%{
            transform: translateY(-0.75%);
        }
        50% {
            transform: translateY(-2.5%);
        }
        75% {
            transform: translateY(0);
        }
        87.5%{
            transform: translateY(-1.25%);
        }
        100% {
            transform:  translateY(0);
        }
    }
</style>
