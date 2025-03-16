import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Users',
    component: () => import('./views/UserDashboard.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router