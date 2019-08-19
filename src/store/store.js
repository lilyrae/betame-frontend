import Vue from 'vue'
import Vuex from 'vuex'
import createCache from 'vuex-cache'
import api from './modules/api'
import account from './modules/account'
import story from './modules/story'
import storytags from './modules/storytags'
import notification from './modules/notification'

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [createCache()],
    modules: {
        api,
        account,
        story,
        storytags,
        notification
    }
})

export default store
