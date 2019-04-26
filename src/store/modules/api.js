const state = {
    error: '',
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
    }
}

const getters = {
    isLoading: state => {
        return state.isLoading
    },
    error: state => {
        return state.error
    }
}

const actions = {}

export default {
    state,
    mutations,
    getters,
    actions
}
