import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import AssignAgency from '@/components/Agencies/AssignAgency.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login' 
  },
  {
    path: '/login',
    name: 'login',
    component : () => import('@/views/LoginView.vue')
  },
  {
    path: '/agency',
    name: 'Agency',
    component : AssignAgency
  },
  {
    path: '/home',
    name: 'home',
    component : () => import('@/views/HomeView.vue')
  },
  {
    path: '/addBien',
    name: 'addBien',
    component : () => import('@/views/AddBienView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router