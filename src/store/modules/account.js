import storyService from '../../services/story'
import auth from '../../services/auth'
import user from '../../services/user'
import karma from '../../services/karma'
import pagination from '../../services/pagination'
import { EventBus } from '../../event-bus'

const state = {
    user: {},
    stories: [],
    cookies: [],
    limit: 10,
    page: 1,
    count: 0
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
    },
    page (state, page) {
        state.page = page
    },
    count (state, count) {
        state.count = count
    }
}

const getters = {
    user: () => state.user,
    stories: () => state.stories,
    cookies: () => state.cookies,
    page: () => state.page,
    count: () => state.count,
    hasNext: () => {
        return pagination.hasNext(state.page, state.limit, state.count)
    },
    hasPrevious: () => {
        return pagination.hasPrevious(state.page, state.limit)
    },
    storyPrice: () => 10
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
    fetchStories: async ({ commit, state }, page) => {
        commit('api/error', null, { root: true })
        commit('api/isLoading', true, { root: true })

        if (page && page > 0) {
            commit('page', page)
        }
        
        try {
            const response = await storyService.withUserID(auth.userId(), state.limit, pagination.offset(state.page, state.limit))
            commit('stories', response.data.stories)
            commit('count', response.data.count)
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
    },
    togglePrivacy: async ({ commit }, story) => {
        commit('api/error', null, { root: true })
        commit('api/isLoading', true, { root: true })

        try {
            await storyService.togglePrivacy(story.story_id, !story.is_private)
            story.is_private = !story.is_private
            commit('api/isLoading', false, { root: true })
            let message = `Your story is now ${story.is_private ? 'private' : 'public'}!`
            commit('api/success', message, { root: true })
        } catch (err) {
            EventBus.$emit('revertPrivacy', story)
            commit('api/error', err || 'Failed to update story privacy.', { root: true })
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
