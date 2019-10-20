import Vue from 'vue'
import App from './App.vue'
import '@babel/polyfill'
import vSelect from 'vue-select'
import VueRouter from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPenNib, faUserAstronaut, faBookOpen, faInfoCircle, faWindowMinimize, faPlus, faCookie, faCookieBite, faHeart, faBan, faComments, faCrown, faBell, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueMatomo from 'vue-matomo'
import VueScrollTo from 'vue-scrollto'
import VueMarkdown from 'vue-markdown'
import ToggleButton from 'vue-js-toggle-button'
import router from './router.js'
import store from './store/store.js'
// eslint-disable-next-line
import filters from './filters.js'

library.add(faPenNib, faUserAstronaut, faBookOpen, faInfoCircle, faWindowMinimize, faPlus, faCookieBite, faCookie, faHeart, faBan, faComments, faCrown, faBell, farBell, faLock, faLockOpen)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('v-select', vSelect)

Vue.use(VueRouter)
Vue.use(VueScrollTo)
Vue.use(VueMarkdown)
Vue.use(ToggleButton)

Vue.use(VueMatomo, {
  host: 'https://kulplex.com/logger',
  siteId: 2,
  router: router,
  enableLinkTracking: true,
  requireConsent: false,
  trackInitialView: true,
  trackerFileName: 'piwik',
  debug: true
})

Vue.config.productionTip = false

/* eslint-disable no-new */
window.Event = new Vue();

new Vue({
  ...App,
  router,
  store
}).$mount('#app')
