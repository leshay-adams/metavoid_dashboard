import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from './stores/authStore'


const routes = [
  {
    path: '/',
    name: 'Avatar',
    component: () => import('./views/AvatarDashboard.vue')
  },
  {
    path: '/user/:id',
    name: 'AvatarDetail',
    component: () => import('./views/AvatarProfile.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) =>{
  const authStore = useAuthStore()
  next()
})

export default router