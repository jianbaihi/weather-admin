<script setup>
    import {ref,onMounted,watch,watchEffect} from 'vue';
    import {storeToRefs} from 'pinia';
    import {useWeatherStore} from '../../stores/weather.js';
    const {getLocalWeatherForecast} = useWeatherStore();
    const {LocalWeatherForecast,goalCityWeatherForecast} = storeToRefs(useWeatherStore());

   
    // 数据格式化
    const weatherList = ref({})
    const formatTextData = (data)=>{
        
        const weekDay = [ '周日','周一', '周二', '周三', '周四', '周五', '周六']
        const day = ['今天', '明天']
        data.map((item, index)=>{
            if(index > 1){
                item.week = weekDay[item.week%7]
            }else{
                item.week = day[index]
            }
        })
       
    }
    // 图表数据格式化
    const dayTemp = ref([]) 
    const nightTemp= ref([])
    const formChartData = (data) =>{
        data.map((item,index)=>{
            dayTemp.value.push(item.daytemp)
            nightTemp.value.push(item.nighttemp)
        })
        
    }

    const weatherOption = ref({})
    const renderChart = (data1,data2) => {
        weatherOption.value = {
            xAxis:{
                type: 'category',
                show:false,
            },
            yAxis: {
                type: 'value',
                show:false,
            },
            grid:{
                top:25,
                left:0,
                right:0,
                bottom:0
            },
            series: [
                {
                    data: data1,
                    type: 'line',
                    label:{
                        show:true,
                        fontSize:12,
                        color:'#fff',
                        formatter: '白{c}°C',
                    },
                },
                {
                    data: data2,
                    type: 'line',
                    label:{
                        show:true,
                        position:'bottom',
                        fontSize:12,
                        color:'#fff',
                        formatter: '晚{c}°C',
                    },
                } 
            ]
        }
    }

    watch(LocalWeatherForecast,(newval)=>{
        // 格式化数据
        console.log(newval)
        weatherList.value = newval
       formatTextData(weatherList.value)
        formChartData(newval)
        // 渲染图表
        renderChart(dayTemp,nightTemp)
        
    })
    watch(goalCityWeatherForecast,(newval)=>{
        // 格式化数据
        console.log(newval)
        weatherList.value = newval
       formatTextData(weatherList.value)
        formChartData(newval)
        // 渲染图表
        renderChart(dayTemp,nightTemp)
    })  
</script>

<template>
<div class="container  text-white">
    <div class="bg-weather-secondary px-12 pt-10 mt-2 rounded">
        <div class="flex gap-6">
            <div v-for="item in weatherList" :key="item.week" class="flex flex-col flex-1 text-center gap-4">
                <span>{{item.week}}</span>
                <span>{{item.date.slice(5,10)}}</span>
                <span>{{item.dayweather}}</span>
                <span>风力 {{item.daypower}}级</span>
            </div>
        </div>
        <div class=" h-40 mt-10">
            <div style="position:relative;width:864px;height:160px;padding:0px;margin:0px;border-width:0px;cursor:default; box-sizing: border-box;">
                <v-charts :option="weatherOption"></v-charts>
            </div>
        </div>
    </div> 
</div>     
</template>


