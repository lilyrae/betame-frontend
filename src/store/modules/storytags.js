import tagService from '../../services/tag'


const state = {
    languageTags: [],
    topicTags: [],
    helpTags: [],
    customTags: [],
    newCustomTags: [],
    languageOptions: [],
    topicOptions: [],
    helpOptions: []
}

const mutations = {
    newCustomTag (state, text) {
        state.newCustomTags.push(text)
    },
    tag (state, tag) {
        const tagType = parseInt(tag.tag_type_id)
        switch(tagType) {
            case tagService.languageTagTypeId():
                state.languageTags.push(tag)
                break
            case tagService.topicTagTypeId():
                state.topicTags.push(tag)
                break
            case tagService.helpTagTypeId():
                state.helpTags.push(tag)
                break
            case tagService.customTagTypeId():
                state.customTags.push(tag)
                break
        }
    },
    deleteTag (state, {tagId, tagTypeId}) {
        const tagType = parseInt(tagTypeId)
        switch(tagType) {
            case tagService.languageTagTypeId():
                state.languageTags.filter((tag) => {
                    return tag.tag_id != tagId
                })
                break
            case tagService.topicTagTypeId():
                state.topicTags.filter((tag) => {
                    return tag.tag_id != tagId
                })
                break
            case tagService.helpTagTypeId():
                state.helpTags.filter((tag) => {
                    return tag.tag_id != tagId
                })
                break
            case tagService.customTagTypeId():
                state.customTags.filter((tag) => {
                    return tag.tag_id != tagId
                })
                break
        }
    },
    tagOptions (state, {options, tagTypeId}) {
        const tagType = parseInt(tagTypeId)
        switch(tagType) {
            case tagService.languageTagTypeId():
                state.languageOptions = options
                break
            case tagService.topicTagTypeId():
                state.topicOptions = options
                break
            case tagService.helpTagTypeId():
                state.helpOptions = options
                break
        }
    }
}

const getters = {
    languageTags: () => state.languageTags,
    topicTags: () => state.topicTags,
    helpTags: () => state.helpTags,
    customTags: () => state.customTags,
    languageOptions: () => state.languageOptions,
    topicOptions: () => state.topicOptions,
    helpOptions: () => state.helpOptions
}

const actions = {
    setTags: async ({ state, commit }, tags) => {
        state.languageTags = []
        state.topicTags = []
        state.helpTags = []
        state.customTags = []
        state.newCustomTags = []

        for (let index = 0; index < tags.length; index++) {
            commit('tag', tags[index])
        }
    },
    fetchTagOptions: async ({ commit }, {tagTypeId}) => {
        commit('api/isLoading', true, { root: true })
        
        try {
            let response = await tagService.search(tagTypeId)
            commit('tagOptions', {options: response.data, tagTypeId})
        } catch (err) {
            commit('api/error', err || 'Failed to find tag list.', { root: true })
        }

        commit('api/isLoading', false, { root: true })
    },
    createNewTag: async ({ commit }, { tagTypeId, tagText }) => {
        commit('api/error', null, { root: true })
        commit('api/isLoading', true, { root: true })
    
        try {
            await tagService.create(tagTypeId, tagText)
        } catch (err) {
            commit('api/error', err || 'Failed to create tag.', { root: true })
        }

        commit('api/isLoading', false, { root: true })
    },
    createStoryTag: async ({ commit }, { tagTypeId, tagText, storyId }) => {
        commit('api/error', null, { root: true })

        if (!tagText) {
            commit('api/error', 'Tags must be text.', { root: true })
            return
        } else if (tagText.length > 50) {
            commit('api/error', `Tag '${tagText}' must be less than 50 characters.`, { root: true })
            return
        }

        commit('api/isLoading', true, { root: true })
        
        try {
            commit('newCustomTag', tagText)
            const tag = await tagService.create(tagTypeId, tagText)
            const response = await tagService.save(storyId, tag.data.tag_id)
            commit('tag', response.data)
        } catch (err) {
            commit('api/error', err || 'Failed to create tag.', { root: true })
        }

        commit('api/isLoading', false, { root: true })
    },
    saveStoryTag: async ({ commit }, {storyId, tag}) => {
        commit('api/error', null, { root: true })
        commit('api/isLoading', true, { root: true })
        
        try {
            await tagService.save(storyId, tag.tag_id)
            commit('tag', tag)
        } catch (err) {
            commit('api/error', err || 'Failed to save tag.', { root: true })
        }

        commit('api/isLoading', false, { root: true })
    },
    deleteStoryTag: async ({ commit }, {storyId, tagId, tagTypeId}) => {
        commit('api/error', null, { root: true })
        commit('api/isLoading', true, { root: true })
        
        try {
            await tagService.delete(storyId, tagId)
            commit('deleteTag', {tagId, tagTypeId})
        } catch (err) {
            commit('api/error', err || 'Failed to delete tag.', { root: true })
        }

        commit('api/isLoading', false, { root: true })
    },
    processSelectedStoryTags: async ({ state, dispatch }, {selectedTags, oldTags, storyId, tagTypeId}) => {    
        let newTags = selectedTags.filter(tag => {
            return typeof tag === 'string' || tag instanceof String
        })
        
        let selected = selectedTags.reduce((collection, tag) => {
            if(tag.tag_id) {
                collection.push(tag.tag_id)
            }
            return collection
        }, [])

        let tags = []

        if (oldTags) {
            tags = oldTags.map(tag => {
                return tag.tag_id
            })
        }

        newTags.forEach(tagText => {
            let text = tagText.trim()
            if (!state.newCustomTags.includes(text)) {
                dispatch('createStoryTag', {
                    storyId,
                    tagText: text,
                    tagTypeId
                })
            }
        });

        selected.forEach(tagId => {
            if (!tags.includes(tagId)) {
                let matchingTags = selectedTags.filter(newTag => {
                    return newTag.tag_id == tagId
                })
                let tag = matchingTags.shift()
                dispatch('saveStoryTag', {
                    storyId,
                    tag
                })
            }
        });

        tags.forEach(tagId => {
            if (!selected.includes(tagId)) {
                dispatch('deleteStoryTag', {
                    storyId,
                    tagTypeId,
                    tagId
                })
            }
        });
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
