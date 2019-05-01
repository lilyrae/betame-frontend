const state = {
    error: '',
    success: '',
    isLoading: false,
    isLoadingCount: 0
}

const mutations = {
    isLoading (state, isLoading) {
        state.isLoadingCount = isLoading ? state.isLoadingCount++ : state.isLoadingCount--
        state.isLoading = (state.isLoadingCount > 0)
    },
    error (state, error) {
        state.error = error
    },
    success (state, success) {
        state.success = success
    }
}

const getters = {
    isLoading: state => {
        return state.isLoading
    },
    error: state => {
        return state.error
    },
    success: state => {
        return state.success
    }
}

const actions = {}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
