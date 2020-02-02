import story from '../../services/story'
import router from '../../router'

const state = {
    stories: [], // all stories
    story: { user: {}, comments: []},
    loadingSearch: false,
    isSearch: false,
    filteredStories: []
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
    isSearch (state, isSearch) {
        state.isSearch = isSearch
    },
    filteredStories (state, filteredStories) {
        state.filteredStories = filteredStories
    },
    clearSearch (state) {
        state.isSearch = false
        state.loadingSearch = false
        state.filteredStories = []
    }
}

const getters = {
    allStories: () => state.stories,
    story: () => state.story,
    loadingSearch: () => state.loadingSearch,
    isSearch: () => state.isSearch,
    filteredStories: () => state.filteredStories,
    displayStories: () => {
        if (state.isSearch) {
            return state.filteredStories
        }
        return state.stories
    }
}

const actions = {
    fetchStories: async ({ commit }) => {
        commit('clearSearch')
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
    searchStories: async ({ commit }, search) => {
        if(!search.title && !search.userIds && !search.ratings && !search.tags &&
            !search.fromDate && !search.untilDate && !search.minWordCount && !search.maxWordCount) {
            // no search terms
            commit('clearSearch')
            return
        }

        commit('api/error', null, { root: true })
        commit('api/isLoading', true, { root: true })
        commit('loadingSearch', true)
        commit('filteredStories', [])
        commit('isSearch', true)
        
        try {
            const response = await story.search(
                search.title,
                search.userIds,
                search.ratings,
                search.tags,
                search.fromDate,
                search.untilDate,
                search.minWordCount,
                search.maxWordCount
            )
            commit('filteredStories', response.data)
        } catch (err) {
            commit('api/error', err || 'Failed to find stories for your search result.', { root: true })
        }

        commit('loadingSearch', false)
        commit('api/isLoading', false, { root: true })
    },
    filterStories: async ({ commit, getters }, search) => {
        const displayStories = getters.displayStories

        commit('api/error', null, { root: true })
        commit('loadingSearch', true)
        commit('filteredStories', [])
        commit('isSearch', true)

        let filteredStories = []

        if(search.query == '' && search.tags.length <= 0) {
            commit('clearSearch')
            return
        }
    
        let i = 0
        let tagIds = search.tags.map(tag => {
            return tag.tag_id
        })
        
        for (i = 0; i < displayStories.length; i++) {
            if(storyMatchesSearch(displayStories[i], search.query, tagIds)) {
                filteredStories.push(displayStories[i])
            }
        }
    
        commit('filteredStories', filteredStories)
        commit('loadingSearch', false)
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

const storyMatchesSearch = (story, query, tagIds) => {
    if (story.tags) {
        let storyTagIds = story.tags.map(tag => {
            return tag.tag_id
        })

        for (let tagId of tagIds) {
            if (!storyTagIds.includes(tagId)) {
                // story does not have search tag
                return false
            }
        }
    } else if (tagIds.length > 0) {
        // story is not tagged
        return false
    }

    // check if story title matches
    let searchTerm = query.toLowerCase()
    return story.title.toLowerCase().includes(searchTerm) ||
        story.user.username.toLowerCase().includes(searchTerm) ||
        storyTagMatchesText(story, searchTerm)
}

const storyTagMatchesText = (story, query) => {
    if (!story.tags || !story.tags.length > 0) {
        return false
    }
    for (let index = 0; index < story.tags.length; index++) {
        const tag = story.tags[index];
        if (tag.text.toLowerCase().includes(query)) {
            return true
        }
    }
    return false
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
