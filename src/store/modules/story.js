import story from '../../services/story'
import auth from '../../services/auth'
import user from '../../services/user'
import router from '../../router'

const state = {
    user: {},
    stories: [],
    story: { user: {}, comments: []}
}

const mutations = {
    user (state, user) {
        state.user = user
    },
    stories (state, stories) {
        state.stories = stories
    },
    story (state, story) {
        state.story = story
    }
}

const getters = {
    user: state => {
        return state.user
    },
    allStories: state => {
        return state.stories
    },
    story: state => {
        return state.story
    }
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
            const response = await story.all()
            commit('stories', response.data)
        } catch (err) {
            commit('api/error', err || 'Failed to retrieve stories.', { root: true })
        }

        commit('api/isLoading', false, { root: true })
    },
    fetchStory: async ({ commit }, id) => {
        commit('api/error', null, { root: true })
        commit('api/isLoading', true, { root: true })
        
        try {
            const response = await story.byId(id)
            commit('story', response.data)
        } catch (err) {
            commit('api/error', err || 'Failed to retrieve stories.', { root: true })
        }

        commit('api/isLoading', false, { root: true })
    },
    editStory: async ({ commit }, {storyId, notes, wordCount}) => {
        commit('api/error', null, { root: true })
        commit('api/isLoading', true, { root: true })
        
        try {
            await story.edit(storyId, notes, wordCount)
            commit('api/isLoading', false, { root: true })
            commit('api/success', 'Updated story!', { root: true })
            router.push('/me')
        } catch (err) {
            commit('api/error', err || 'Failed to update story.', { root: true })
            commit('api/isLoading', false, { root: true })
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}