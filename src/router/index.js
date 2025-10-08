import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Login from '../views/LoginView.vue'
import Products from '../views/ProductView.vue'
import CartDetail from '@/components/UI/CartDetail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/products',
      name: 'Products',
      component: Products
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/cart', 
      name: 'CartDetail',
      component: CartDetail
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
