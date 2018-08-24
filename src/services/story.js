import api from './betame.api'

const storyUrl = "/story";

export default {
    all() {
        return api.get(storyUrl);
    },
    withUserID(userId) {
        return api.get(storyUrl, {userId});
    },
    create(title, notes, url) {
        return api.post(storyUrl, {title, notes, url});
    }
}