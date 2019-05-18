const state = {
    error: '',
    success: '',
    isLoadingCount: 0
}

const mutations = {
    isLoading (state, isLoading) {
        let change = isLoading ? 1 : -1
        state.isLoadingCount = state.isLoadingCount + change
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
        return (state.isLoadingCount > 0)
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
