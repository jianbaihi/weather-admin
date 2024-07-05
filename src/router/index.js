import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:'home',
      redirect:'/weather',
      component:()=>import('../views/HomeLayout.vue'),
      children:[
        {
          path:'weather',
          name:'weather',
          component:()=>import('../views/HomeMain.vue'),
      },
      {
          path:'weather/:adcode/:city',
          name:'city',
          component:()=>import('../views/CityWeather.vue')
      },
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../views/NotFoundView.vue'),
    },
  ]
})

export default router
