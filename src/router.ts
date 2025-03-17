import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from './stores/authStore'


const routes = [
  {
    path: '/',
    name: 'AvatarDashboard',
    component: () => import('./views/AvatarDashboard.vue')
  },
  {
    path: '/avatar/:id',
    name: 'AvatarProfile',
    component: () => import('./views/AvatarProfile.vue'),
    props: true,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore()
//   if (to.meta.requiresAuth && !authStore.isAuthenticated) {
//     next({ name: 'Login' })
//   } else {
//     next()
//   }
// })

export default router