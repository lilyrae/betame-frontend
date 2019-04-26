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
    languageTags: state => {
        return state.languageTags
    },
    topicTags: state => {
        return state.topicTags
    },
    helpTags: state => {
        return state.helpTags
    },
    customTags: state => {
        return state.customTags
    },
    languageOptions: state => {
        return state.languageOptions
    },
    topicOptions: state => {
        return state.topicOptions
    },
    helpOptions: state => {
        return state.helpOptions
    }
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
        commit('isLoading', true)
        
        try {
            let response = await tagService.search(tagTypeId)
            commit('tagOptions', {options: response.data, tagTypeId})
        } catch (err) {
            commit('error', err || 'Failed to find tag list.')
        }

        commit('isLoading', false)
    },
    createStoryTag: async ({ commit }, { tagTypeId, tagText, storyId }) => {
        commit('error', null)

        if (!tagText) {
            commit('error', 'Tags must be text.')
            return
        } else if (tagText.length > 50) {
            commit('error', `Tag '${tagText}' must be less than 50 characters.`)
            return
        }

        commit('isLoading', true)
        
        try {
            commit('newCustomTag', tagText)
            const tag = await tagService.create(tagTypeId, tagText)
            const response = await tagService.save(storyId, tag.data.tag_id)
            commit('tag', response.data)
        } catch (err) {
            commit('error', err || 'Failed to create tag.')
        }

        commit('isLoading', false)
    },
    saveStoryTag: async ({ commit }, {storyId, tag}) => {
        commit('error', null)
        commit('isLoading', true)
        
        try {
            await tagService.save(storyId, tag.tag_id)
            commit('tag', tag)
        } catch (err) {
            commit('error', err || 'Failed to save tag.')
        }

        commit('isLoading', false)
    },
    deleteStoryTag: async ({ commit }, {storyId, tagId, tagTypeId}) => {
        commit('error', null)
        commit('isLoading', true)
        
        try {
            await tagService.delete(storyId, tagId)
            commit('deleteTag', {tagId, tagTypeId})
        } catch (err) {
            commit('error', err || 'Failed to delete tag.')
        }

        commit('isLoading', false)
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
    state,
    mutations,
    getters,
    actions
}
