import api from './betame.api'

const adminUrl = "/admin";
const userUrl ="/user"

export default {
    users() {
        return api.get(`${adminUrl}${userUrl}`)
    },
    banUser(userId) {
        return api.get(`${adminUrl}${userUrl}/ban/${userId}`)
    },
    unbanUser(userId) {
        return api.get(`${adminUrl}${userUrl}/unban/${userId}`)
    }
}