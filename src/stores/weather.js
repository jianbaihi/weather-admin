import {ref,watch} from 'vue'
import { defineStore } from 'pinia'
import {getAdcodeByIp,getAdcodeByCity,getWeatherByAdcode,getWeatherForecastByAdcode} from '../api/index.js'

export const useWeatherStore = defineStore('weather', ()=>{
    const localCity = ref({})
    const LocalWeatherForecast = ref([])
    const goalCity = ref({})
    const goalCityWeatherForecast = ref([])
    
    
    // 下面三个方法均是与本地（IP所在地）的天气相关的API封装
    // 根据ip获取所在地的城市
    const getCityByIp = async()=>{
        const res = await getAdcodeByIp()
        return res.data
    }
    // 根据所在地的城市获取天气
    const getLocalWeather = async()=>{
        const city = await getCityByIp()
        const res = await getWeatherByAdcode(city.adcode)
        localCity.value = res.data.lives[0]
        return res.data.lives[0]
    }
    // 根据所在地的城市获取天气预报
    const getLocalWeatherForecast = async()=>{
        const city = await getCityByIp()
        const res = await getWeatherForecastByAdcode(city.adcode)
        LocalWeatherForecast.value = res.data.forecasts[0].casts
        return res.data.forecasts[0].casts
    }
    // 下面三个方法均是与搜索城市的天气相关的API封装
    // 根据城市名称获取所在地的城市
    const getCityByName = async(name)=>{
        const res = await getAdcodeByCity(name)
        return res.data
    }
    // 根据城市名称获取天气
    const getCityWeather = async(name)=>{
        const city = await getCityByName(name)
        if(city.geocodes){
            const res = await getWeatherByAdcode(city.geocodes[0].adcode)
            goalCity.value = res.data.lives[0]
            return res.data.lives[0]
        }
    }
    // 根据城市名称获取天气预报
    const getCityWeatherForecast = async(name)=>{
        const city = await getCityByName(name)
        const res = await getWeatherForecastByAdcode(city.geocodes[0].adcode)
        goalCityWeatherForecast.value = res.data.forecasts[0].casts
        return res.data.forecasts[0].casts
    }

    // 将城市添加到到搜索城市列表
    const cityList = ref([])
    const city = ref({})
    // 获取本地存储的城市列表
    const getCityList = ()=>{
        const data = JSON.parse(localStorage.getItem('cityList')||[])
        cityList.value = data
    }
   
    
    // 遍历城市列表，获取天气,用promise.all来并发请求
    const mapCityList = ()=>{
        const emptyCity = cityList.value.map(item=> item.adcode)
        console.log(emptyCity)
        const requestList = emptyCity.map((item)=> getWeatherByAdcode(item))
        
        // console.log(requestList)
        Promise.all(requestList).then(res=>{
            res.forEach((item,index)=>{
                cityList.value[index].weather = item.data.lives[0].temperature
            })
        })
        console.log(cityList.value)
        
    }
    
    // 增加城市
    const addCity = (city)=>{
        cityList.value.push(city)
        active.value = false
    }
    // 删除城市
    const deleteCity = (id)=>{
        const index = cityList.value.findIndex(item=>item.id===id)
        cityList.value.splice(index,1)
    }
    watch(cityList,()=>{
        localStorage.setItem('cityList',JSON.stringify(cityList.value))
    },{deep:true})

    // 控制加号按钮的显示与隐藏
    const active = ref(false)
    
    

    return{
        localCity,
        LocalWeatherForecast,
        goalCity,
        goalCityWeatherForecast,
        getCityByIp,
        getLocalWeather,
        getLocalWeatherForecast,
        getCityByName,
        getCityWeather,
        getCityWeatherForecast,
        cityList,
        city,
        mapCityList,
        getCityList,
        addCity,
        deleteCity,
        active
        
        
    }
    
})