import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router.ts'
import pinia from './stores/pinia.ts'

const app = createApp(App)

app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})

app.use(router)
app.use(pinia)
app.mount('#app')
