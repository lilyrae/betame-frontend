import api from './betame.api'

const userUrl = "/user";

export default {
    top() {
        return api.get(`${userUrl}/top`)
    }
}