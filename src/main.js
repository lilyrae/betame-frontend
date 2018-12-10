import Vue from 'vue'
import App from './App.vue'
import vSelect from 'vue-select'
import VueRouter from 'vue-router'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import Signup from './pages/Signup.vue'
import Me from './pages/Me.vue'
import About from './pages/About.vue'
import CreateStory from './pages/CreateStory.vue'
import Story from './pages/Story.vue'
import NotFound from './pages/NotFound.vue'
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPenNib, faUserAstronaut, faBookOpen, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPenNib)
library.add(faUserAstronaut)
library.add(faBookOpen)
library.add(faInfoCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('v-select', vSelect)

Vue.use(BootstrapVue);
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/abc123', component: Signup },
  { path: '/me', component: Me },
  { path: '/about', component: About },
  { path: '/story/new', component: CreateStory },
  { path: '/story/:id', component: Story, props: true },
  { path: '/404', component: NotFound },  
  { path: '*', redirect: '/404' }
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
