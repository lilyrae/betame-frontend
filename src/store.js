import Vue from 'vue'
import Vuex from 'vuex'
import createCache from 'vuex-cache'
import story from './services/story'

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [createCache()],
    state: {
        stories: [],
        story: { user: {}, comments: []},
        error: '',
        isLoading: false
    },
    mutations: {
        stories (state, stories) {
            state.stories = stories
        },
        story (state, story) {
            state.story = story
        },
        isLoading (state, isLoading) {
            state.isLoading = isLoading
        },
        error (state, error) {
            state.error = error
        }
    },
    getters: {
        allStories: state => {
            return state.stories
        },
        story: state => {
            return state.story
        },
        isLoading: state => {
            return state.isLoading
        },
        error: state => {
            return state.error
        }
    },
    actions: {
        fetchStories: async ({ commit }) => {
            commit('error', null)
            commit('isLoading', true)
            
            try {
                const response = await story.all()
                commit('stories', response.data)
            } catch (err) {
                commit('error', err || 'Failed to retrieve stories.')
            }

            commit('isLoading', false)
        },
        fetchStory: async ({ commit }, id) => {
            commit('error', null)
            commit('isLoading', true)
            
            try {
                const response = await story.byId(id)
                commit('story', response.data)
            } catch (err) {
                commit('error', err || 'Failed to retrieve stories.')
            }

            commit('isLoading', false)
        },
    }
})

export default store
