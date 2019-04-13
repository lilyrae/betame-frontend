import api from './betame.api'

const userUrl = "/user";

export default {
    top() {
        return api.get(`${userUrl}/top`)
    },
    get(userId) {
        return api.get(`${userUrl}/${userId}`)
    },
    isValidInvite(code) {
        return api.get(`${process.env.VUE_APP_API}/invite/valid/${code}`)
    },
}