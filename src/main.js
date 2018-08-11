import Vue from 'vue'
import App from './App.vue'
import vSelect from 'vue-select'
import VueRouter from 'vue-router'
import StoryList from './pages/StoryList.vue'
import Login from './pages/Login.vue'
import About from './pages/About.vue'
import CreatedStory from './pages/CreatedStory.vue'

Vue.component('v-select', vSelect)
Vue.use(VueRouter)

const routes = [
  { path: '/', component: StoryList },
  { path: '/login', component: Login },
  { path: '/about', component: About },
  { path: '/story', component: CreatedStory }
]

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  ...App,
  router
}).$mount('#app')
