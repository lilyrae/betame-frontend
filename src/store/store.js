import Vue from 'vue'
import Vuex from 'vuex'
import createCache from 'vuex-cache'
import api from './modules/api'
import story from './modules/story'
import storytags from './modules/storytags'

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [createCache()],
    modules: {
        api,
        story,
        storytags
    }
})

export default store
