import Vue from 'vue'
import App from './App.vue'
import vSelect from 'vue-select'
import VueRouter from 'vue-router'
import StoryList from './pages/StoryList.vue'
import Login from './pages/Login.vue'
import Me from './pages/Me.vue'
import About from './pages/About.vue'
import CreateStory from './pages/CreateStory.vue'

Vue.component('v-select', vSelect)
Vue.use(VueRouter)

const routes = [
  { path: '/', component: StoryList },
  { path: '/login', component: Login },
  { path: '/me', component: Me },
  { path: '/about', component: About },
  { path: '/new', component: CreateStory }
]

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  ...App,
  router
}).$mount('#app')
