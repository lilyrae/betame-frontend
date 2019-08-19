import story from '../../services/story'
import auth from '../../services/auth'
import user from '../../services/user'
import karma from '../../services/karma'


const state = {
    user: {},
    stories: [],
    cookies: []
}

const mutations = {
    user (state, user) {
        state.user = user
    },
    stories (state, stories) {
        state.stories = stories
    },
    cookies (state, cookies) {
        state.cookies = cookies
    }
}

const getters = {
    user: () => state.user,
    stories: () => state.stories,
    cookies: () => state.cookies
}

const actions = {
    fetchUser: async ({ commit }) => {
        commit('api/error', null, { root: true })
        commit('api/isLoading', true, { root: true })
        
        try {
            const response = await user.get(auth.userId())
            commit('user', response.data)
        } catch (err) {
            commit('api/error', err || 'Failed to get account information.', { root: true })
        }

        commit('api/isLoading', false, { root: true })
    },
    fetchStories: async ({ commit }) => {
        commit('api/error', null, { root: true })
        commit('api/isLoading', true, { root: true })
        
        try {
            const response = await story.withUserID(auth.userId())
            commit('stories', response.data)
        } catch (err) {
            commit('api/error', err || 'Failed to retrieve your stories.', { root: true })
        }

        commit('api/isLoading', false, { root: true })
    },
    fetchCookies: async ({ commit }) => {
        commit('api/error', null, { root: true })
        commit('api/isLoading', true, { root: true })
        
        try {
            const response = await karma.getForCurrentUser()
            commit('cookies', response.data)
        } catch (err) {
            commit('api/error', err || 'Failed to retrieve stories.', { root: true })
        }

        commit('api/isLoading', false, { root: true })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
