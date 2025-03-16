import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Avatar',
    component: () => import('./views/AvatarDashboard.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router