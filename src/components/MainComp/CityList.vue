<script setup>
import { ref, onMounted } from 'vue'
import {useWeatherStore} from '../../stores/weather.js'
import {storeToRefs} from 'pinia'
import { useRouter } from 'vue-router'

const {cityList} = storeToRefs(useWeatherStore())
const {getCityList,deleteCity} = useWeatherStore()
const router = useRouter()
const check = ref('')

const handleCheck = (id) => {
    const check = cityList.value.find(item => item.id === id)
    router.push({name:'city',params:{adcode:check.adcode,city:check.city}})
}
const handleDelete = (id) => {
    deleteCity(id)
}

onMounted(() => {
    getCityList()
})
const handleMouseEnter = (id) => {
    check.value = id
}
const handleMouseLeave = () => {
    check.value = ''
}
</script>

<template>
  <div class="mt-10 max-h-[300px] overflow-y-scroll  scrollbar-thin overflow: overlay hover:scrollbar-thumb-blue-300">
    <h2 v-if="!cityList.length" class="text-center duration-200">
      暂时没有保存过城市天气信息，请查询后点击右上角"+"号保存。
    </h2>
    <div v-for="item in cityList" :key="item.id" class="flex justify-between" @mouseenter="handleMouseEnter(item.id)" @mouseleave="handleMouseLeave">
      <div
        class="mb-4 bg-weather-secondary py-2 px-4 flex justify-between cursor-pointer w-full duration-300 "
        :class="{'w-5/6': check === item.id}"
        >
        <h3>{{ item.city }}</h3>
        <span>{{item.weather}}度</span>
      </div>
      <div v-show="check === item.id" class="flex mb-4 gap-2">
        
            <button @click="handleCheck(item.id)" class="bg-yellow-500 text-center w-[80px]">查看</button>
            <button @click="handleDelete(item.id)" class="bg-yellow-500 text-center w-[80px]">删除</button>
        
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-thin {
    overflow: overlay;
}
</style>
