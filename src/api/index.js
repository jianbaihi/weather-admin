import request from './axios.js';

// 获取ip所在地的adcode
export const getAdcodeByIp = ()=>{
    return request.get('/ip?&key=ce38790c281afc7977edaf3ac7d17d61')
}

// 获取对应adcode的实时天气信息
export const getWeatherByAdcode = (adcode)=>{
    return request.get(`weather/weatherInfo?city=${adcode}&key=ce38790c281afc7977edaf3ac7d17d61&extensions=base`)
}

// 获取对应adcode的四天天气预报
export const getWeatherForecastByAdcode = (adcode)=>{
    return request.get(`weather/weatherInfo?city=${adcode}&key=ce38790c281afc7977edaf3ac7d17d61&extensions=all`)
}

// 获取对应城市的adcode
export const getAdcodeByCity = (city)=>{
    return request.get(`geocode/geo?address=${city}&key=ce38790c281afc7977edaf3ac7d17d61`)
}

