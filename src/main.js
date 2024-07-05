import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import "./style.css"//引入tailwindcss的css文件
// eslint-disable-next-line no-unused-vars
import * as echarts from 'echarts'
import VueEcharts from 'vue-echarts'//导入vue-echarts组件

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('v-charts', VueEcharts)
app.mount('#app')
