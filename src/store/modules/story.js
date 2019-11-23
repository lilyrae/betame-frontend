import story from '../../services/story'
import router from '../../router'

const state = {
    stories: [],
    story: { user: {}, comments: []}
}

const mutations = {
    stories (state, stories) {
        state.stories = stories
    },
    story (state, story) {
        state.story = story
    }
}

const getters = {
    allStories: () => state.stories,
    story: () => state.story
}

const actions = {
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
    editStory: async ({ commit }, {storyId, notes, rating, wordCount}) => {
        commit('api/error', null, { root: true })
        commit('api/isLoading', true, { root: true })
        
        try {
            await story.edit(storyId, notes, rating, wordCount)
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
