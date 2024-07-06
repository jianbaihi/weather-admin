<script setup>
import { ref, onMounted, watch } from 'vue'
import SearchBox from '../components/HomeMainComp/SearchBox.vue'
import CityList from '../components/HomeMainComp/CityList.vue'
import WeatherShow from '../components/HomeMainComp/WeatherShow.vue'

import { storeToRefs } from 'pinia'
import { useWeatherStore } from '../stores/weather.js'
const { getLocalWeatherForecast } = useWeatherStore()
const { LocalWeatherForecast } = storeToRefs(useWeatherStore())

import { useNetworkStore } from '../stores/network.js'
const { networkLoading } = storeToRefs(useNetworkStore())

onMounted(async () => {
  // 获取本地天气预报
  LocalWeatherForecast.value = await getLocalWeatherForecast()
  // console.log(LocalWeatherForecast.value)
})
</script>

<template>
  <div v-show="networkLoading" class="text-center text-white text-xl"><h1>正在加载天气数据...</h1></div>
  <div v-show="!networkLoading">
    <main class="container text-white">
      <SearchBox></SearchBox>
      <CityList></CityList>
      <h2 class="mt-6">近期天气</h2>
    </main>
    <WeatherShow></WeatherShow>
  </div>
</template>
