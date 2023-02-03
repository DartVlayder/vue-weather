import { createRouter, createWebHistory } from 'vue-router'
import WeatherPage from '../views/WeatherPage'
import settingPage from '../views/settingPage'
const routes = [
  {
    path: '/',
    name: 'WeatherPage',
    component: WeatherPage
  },
  {
    path: '/settingPage',
    name: 'settingPage',
    component: settingPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
