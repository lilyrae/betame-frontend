import api from './betame.api'

const notificationUrl = "/notification";

export default {
    all() {
        return api.get(notificationUrl);
    },
    clear(notifications) {
        return api.post(notificationUrl, {notifications})
    },
    history() {
        return api.get(`${notificationUrl}/history`);
    }
}