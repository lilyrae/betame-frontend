import story from '../../services/story'
import router from '../../router'
import pagination from '../../services/pagination'
import ratingService from '../../services/rating'
import auth from '../../services/auth'

const state = {
    stories: [], // all stories
    story: { user: {}, comments: []},
    loadingSearch: false,
    filteredStories: [],
    filterTags: [],
    filterTitle: '',
    search: null,
    limit: 20,
    page: 1,
    count: 0,
    isSearch: false,
    recommendationLink: '/'
}

const mutations = {
    stories (state, stories) {
        state.stories = stories
    },
    story (state, story) {
        state.story = story
    },
    loadingSearch (state, loadingSearch) {
        state.loadingSearch = loadingSearch
    },
    filteredStories (state, filteredStories) {
        state.filteredStories = filteredStories
    },
    clearSearch (state) {
        state.search = null
        state.loadingSearch = false
        state.filteredStories = []
        state.filterTags = []
        state.filterTitle = ''
    },
    addFilterTag (state, tag) {
        let searchTagIds = state.filterTags.map(searchTag => {
            return searchTag.tag_id
        })

        if (!searchTagIds.includes(tag.tag_id)) {
            state.filterTags.push(tag)
        }
    },
    removeFilterTag (state, tag) {
        state.filterTags = state.filterTags.filter(t => {
            return t.tag_id !== tag.tag_id
        })
    },
    filterTags (state, tags) {
        state.filterTags = tags
    },
    filterTitle (state, filterTitle) {
        state.filterTitle = filterTitle
    },
    search (state, search) {
        state.search = search
    },
    limit (state, limit) {
        state.limit = limit
    },
    page (state, page) {
        state.page = page
    },
    count (state, count) {
        state.count = count
    },
    isSearch (state, isSearch) {
        state.isSearch = isSearch
    },
    recommendationLink(state, recommendationLink) {
        state.recommendationLink = recommendationLink
    }
}

const getters = {
    stories: () => state.stories,
    story: () => state.story,
    loadingSearch: () => state.loadingSearch,
    isSearch: () => state.isSearch,
    filterTags: () => state.filterTags,
    filterTitle: () => state.filterTitle,
    search: () => state.search,
    limit: () => state.limit, // perPage
    page: () => state.page,
    count: () => state.count,
    hasNext: () => {
        return pagination.hasNext(state.page, state.limit, state.count)
    },
    hasPrevious: () => {
        return pagination.hasPrevious(state.page, state.limit)
    },
    recommendationLink: () => state.recommendationLink
}

const actions = {
    fetchStories: async ({ state, commit, dispatch }, page) => {
        if (state.search ||
            (state.filterTags && state.filterTags.length > 0) ||
            (state.filterTitle && state.filterTitle.length > 0)) {
            dispatch('searchStories', {search: state.search, page })
            return
        }

        commit('api/error', null, { root: true })
        commit('api/isLoading', true, { root: true })
        
        if (page && page > 0) {
            commit('page', page)
        }

        try {
            const response = await story.all(state.limit, pagination.offset(state.page, state.limit))
            commit('stories', response.data.stories)
            commit('count', response.data.count)

            if (state.page == 1) {                        
                let index = 0;
                let stillSearching = true
                let link = '/'
                while (index <= (response.data.stories.length - 1) && stillSearching) {
                    let story = response.data.stories[index]
                    if (!ratingService.requiresWarning(story.rating) &&
                        auth.userId() != story.user_id &&
                        story.comment_count == 0 &&
                        story.word_count < 3000) {
                        if (story.word_count < 1000) {
                            link = `/story/${story.story_id}`
                            stillSearching = false
                        } else if (link === '/') {
                            link = `/story/${story.story_id}`
                        }
                    }
                    index = index + 1
                }
                commit('recommendationLink', link)
            }
        } catch (err) {
            commit('api/error', err || 'Failed to retrieve stories.', { root: true })
        }

        commit('isSearch', false)
        commit('api/isLoading', false, { root: true })
    },
    searchStories: async ({ commit, state, dispatch }, {search, page}) => {
        commit('search', search)

        if((!search || (!search.userIds && !search.ratings && !search.fromDate && !search.untilDate && !search.minWordCount && !search.maxWordCount)) &&
            (!state.filterTags || state.filterTags.length <= 0) &&
            (!state.filterTitle || state.filterTitle.length <= 0)) {
            // no search terms
            commit('clearSearch')
            dispatch('fetchStories')
            return
        }

        search = search || {}
        page = page || 1
        commit('page', page)

        commit('api/error', null, { root: true })
        commit('api/isLoading', true, { root: true })
        commit('loadingSearch', true)
        commit('stories', [])

        let tags = state.filterTags.map(searchTag => {
            return searchTag.tag_id
        }).join(',')
        
        try {
            const response = await story.search(
                state.filterTitle,
                search.userIds,
                search.ratings,
                tags,
                search.fromDate,
                search.untilDate,
                search.minWordCount,
                search.maxWordCount,
                state.limit,
                pagination.offset(page, state.limit)
            )
            commit('stories', response.data.stories)
            commit('count', response.data.count)
        } catch (err) {
            commit('api/error', err || 'Failed to find stories for your search result.', { root: true })
        }

        commit('isSearch', true)
        commit('loadingSearch', false)
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
