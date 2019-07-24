import api from './betame.api'

const notificationUrl = "/notification";

export default {
    all() {
        return api.get(notificationUrl);
    }
}