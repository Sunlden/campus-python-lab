import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './style.css'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount('#app')

// 应用启动后立即在后台预加载 Python 环境
import { useCourseStore } from './store/courseStore'
const store = useCourseStore()
store.initPyodide()
