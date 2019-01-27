import Vue from 'vue'
import App from './App.vue'
import '@babel/polyfill'
import vSelect from 'vue-select'
import VueRouter from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPenNib, faUserAstronaut, faBookOpen, faInfoCircle, faWindowMinimize } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueMatomo from 'vue-matomo'
import router from './router.js'
// eslint-disable-next-line
import filters from './filters.js'

library.add(faPenNib)
library.add(faUserAstronaut)
library.add(faBookOpen)
library.add(faInfoCircle)
library.add(faWindowMinimize)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('v-select', vSelect)

Vue.use(VueRouter)

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
  router
}).$mount('#app')
