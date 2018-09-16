import Vue from 'vue'
import App from './App.vue'
import vSelect from 'vue-select'
import VueRouter from 'vue-router'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import Me from './pages/Me.vue'
import About from './pages/About.vue'
import CreateStory from './pages/CreateStory.vue'
import Story from './pages/Story.vue'

Vue.component('v-select', vSelect)
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/me', component: Me },
  { path: '/about', component: About },
  { path: '/story/new', component: CreateStory },
  { path: '/story/:id', component: Story, props: true }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = 'Beta me.'
  next()
})

Vue.config.productionTip = false

/* eslint-disable no-new */
window.Event = new Vue();

new Vue({
  ...App,
  router
}).$mount('#app')
