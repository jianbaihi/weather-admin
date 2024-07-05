<script setup>
import { ref,watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useWeatherStore } from '../../stores/weather.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const cityName = ref('')
const searchCity = ref({})
const { getCityByName } = useWeatherStore()
const {active,cityList} = storeToRefs(useWeatherStore())
const city = ref('')
// 监听cityName变化
watch(
  cityName,
  async (newVal) => {
    const res = await getCityByName(newVal)
    // 前置判断，如果有res.geocodes，则说明找到了城市，把城市信息赋值给city，否则赋值为空对象
    if (res.geocodes) {
      searchCity.value = res.geocodes[0]
      console.log(searchCity.value)
      // console.log(222)
      if(res.geocodes[0].district.length>0){
        searchCity.value = res.geocodes[0]
        city.value = res.geocodes[0].district
      }else if(res.geocodes[0].city.length>0){
        searchCity.value = res.geocodes[0]
        city.value = res.geocodes[0].city
      }else if(res.geocodes[0].province.length>0){
        searchCity.value = res.geocodes[0]
        city.value = res.geocodes[0].province
      }
    }else{    
      searchCity.value = {}
    }
    // console.log(city.value)
  },
)
  const handleClick = ()=>{
      // 点击展开的城市列表项,跳转路由
      // console.log(111)
      // console.log(searchCity.value.adcode)
      // router.push(`/weather/${searchCity.adcode}?search=${searchCity.city}`)
     router.push({name:'city',params:{adcode:searchCity.value.adcode,city:city.value}})
    // console.log(active.value)
     active.value = true
     console.log(active.value)
  }
</script>

<template>
  <div class="pt-4 mb-8 relative">
    <input
      type="text"
      placeholder="请输入城市名称"
      v-model="cityName"
      class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-md"
    />
    <ul
      class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[62px]"
      v-show="cityName"
    >
      <p style="display:none">对不起网络似乎除了点问题 请稍后再查询</p>
      <li v-if="searchCity" @click="handleClick" class="py-2 cursor-pointer">{{ city }}</li>
      <p v-else>似乎没有找到你查找的城市</p>
    </ul>
  </div>
</template>

<style scoped>
.focus\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.focus\:shadow-md:focus {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
    var(--tw-shadow);
}
.focus\:border-weather-secondary:focus {
  --tw-border-opacity: 1;
  border-color: rgb(0 78 113 / var(--tw-border-opacity));
}
</style>
