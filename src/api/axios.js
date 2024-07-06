import axios from 'axios'
import { useNetworkStore } from '../stores/network'
import { storeToRefs } from 'pinia'


const axiosInstance = axios.create({ 
    baseURL: 'https://restapi.amap.com/v3',
    timeout: 3000
})

// 请求拦截器
axiosInstance.interceptors.request.use(
    
    (config) => {
        const {networkLoading} = storeToRefs(useNetworkStore())
        networkLoading.value = true
        // console.log(networkLoading.value,'请求拦截器')
        return config
    },
    (error) => {
    //    const {networkError} = storeToRefs(useNetworkStore())
        // networkError.value = true
        // console.log(networkError.value,'请求拦截器错误')
        return Promise.reject(error)
    }
)
// 响应拦截器
axiosInstance.interceptors.response.use(

    (response) => {
        const {networkLoading, networkError} = storeToRefs(useNetworkStore())
        networkError.value = false
        networkLoading.value = false
        // console.log(networkLoading.value,'响应拦截器')
        return response
    },
    (error) => {
        const {networkLoading, networkError} = storeToRefs(useNetworkStore())
        networkError.value = true
        networkLoading.value = true
        console.log(networkError.value,'响应拦截器')
    }
)

export default axiosInstance