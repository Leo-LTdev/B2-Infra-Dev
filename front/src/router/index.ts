import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import AssignAgency from '@/components/Agencies/AssignAgency.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login' 
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/agency',
    name: 'Agency',
    component : AssignAgency
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router