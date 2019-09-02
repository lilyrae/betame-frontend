import commentApi from '../../services/comment'

const state = {
    comments: [],
    isLoadingComments: false,
    message: '',
    messageType: ''
}

const SUCCESS_MESSAGE_TYPE = 'SUCCESS'
const ERROR_MESSAGE_TYPE = 'ERROR'

const mutations = {
    comments (state, comments) {
        state.comments = comments
    },
    isLoadingComments(state, isLoadingComments) {
        state.isLoadingComments = isLoadingComments
    },
    success (state, message) {
        state.message = message
        state.messageType = 'SUCCESS'
    },
    error (state, message) {
        state.message = message
        state.messageType = 'ERROR'
    },
    clearMessage (state) {
        state.message = ''
        state.messageType = ''
    }
}

const getters = {
    comments: () => state.comments,
    isLoadingComments: () => state.isLoadingComments,
    message: () => state.message,
    isSuccess: () => state.messageType === SUCCESS_MESSAGE_TYPE,
    isError: () => state.messageType === ERROR_MESSAGE_TYPE
}

const actions = {
    createComment: async ({ commit }, {text, storyId, parentId}) => {
        commit('clearMessage')
        commit('isLoadingComments', true)
        
        try {
            await commentApi.create(storyId, parentId, text)
            commit('success', 'Created new comment')
        } catch (err) {
            commit('error', err || 'Failed to create new comment.')
        }
        commit('isLoadingComments', false)
    },
    editComment: async ({ commit }, {commentId, text}) => {
        commit('clearMessage')
        commit('isLoadingComments', true)
        
        try {
            await commentApi.edit(commentId, text)
            commit('success', 'Edited comment')
        } catch (err) {
            commit('error', err || 'Failed to edit comment.')
        }

        commit('isLoadingComments', false)
    },
    deleteComment: async ({ commit }, commentId) => {
        commit('clearMessage')
        commit('isLoadingComments', true)
        
        try {
            await commentApi.delete(commentId)
            commit('success', 'Deleted comment')
        } catch (err) {
            commit('error', err || 'Failed to delete comment.')
        }

        commit('isLoadingComments', false)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
