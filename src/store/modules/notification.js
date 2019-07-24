import notificationService from '../../services/notification'

const state = {
    notifications: []
}

const mutations = {
    notifications (state, notifications) {
        state.notifications = notifications
    }
}

const getters = {
    notifications: state => {
        return state.notifications
    }
}

const actions = {
    fetchNotifications: async ({ commit }) => {
        try {
            const response = await notificationService.all()
            commit('notifications', response.data)
        } catch (err) {
            commit('api/error', err || 'Failed to get notifications.', { root: true })
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
