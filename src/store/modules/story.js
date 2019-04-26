import story from '../../services/story'
import auth from '../../services/auth'
import user from '../../services/user'

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
        commit('error', null)
        commit('isLoading', true)
        
        try {
            const response = await user.get(auth.userId())
            commit('user', response.data)
        } catch (err) {
            commit('error', err || 'Failed to get account information.')
        }

        commit('isLoading', false)
    },
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
    editStory: async ({ commit }, {storyId, notes, wordCount}) => {
        commit('error', null)
        commit('isLoading', true)
        
        try {
            await story.edit(storyId, notes, wordCount)
        } catch (err) {
            commit('error', err || 'Failed to update story.')
        }

        commit('isLoading', false)
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}
