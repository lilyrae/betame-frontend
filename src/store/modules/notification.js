import notificationService from '../../services/notification'

const state = {
    notifications: [],
    notificationHistory: []
}

const mutations = {
    notifications (state, notifications) {
        if (Array.isArray(notifications)) {
            state.notifications = notifications
        } 
    },
    clearNotifications (state, deletedNotificationIds) {
        state.notifications = state.notifications.filter((notification) => {
            return !deletedNotificationIds.includes(notification.notification_id)
        })
    },
    notificationHistory (state, notificationHistory) {
        if (Array.isArray(notificationHistory)) {
            state.notificationHistory = notificationHistory
        }
    }
}

const getters = {
    notifications: () =>  state.notifications,
    notificationHistory: () =>  state.notificationHistory,
}

const actions = {
    fetchNotifications: async ({ commit }) => {
        try {
            const response = await notificationService.all()
            commit('notifications', response.data)
        } catch (err) {
            commit('api/error', err || 'Failed to get notifications.', { root: true })
        }
    },
    fetchHistory: async ({ commit }) => {
        try {
            const response = await notificationService.history()
            commit('notificationHistory', response.data)
        } catch (err) {
            commit('api/error', err || 'Failed to get notifications.', { root: true })
        }
    },
    clearNotifications: async ({ commit }, notifications) => {
        try {
            commit('api/isLoading', true, { root: true })
            let notificationIds = notifications.join(',')
            await notificationService.clear(notificationIds)
            commit('clearNotifications', notifications)
        } catch (err) {
            commit('api/error', err || 'Failed to clear notifications.', { root: true })
        }
        commit('api/isLoading', false, { root: true })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
