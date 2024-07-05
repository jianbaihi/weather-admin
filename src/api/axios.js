import axios from 'axios'

const request = axios.create({ 
    baseURL: 'https://restapi.amap.com/v3',
    timeout: 3000
})
export default request