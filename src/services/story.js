import api from './betame.api'

const storyUrl = "/story";

export default {
    all() {
        return api.get(storyUrl);
    },
    byId(id) {
        return api.get(storyUrl + "/" + id);
    },
    withUserID(userId) {
        return api.get(storyUrl, {userId});
    },
    create(title, notes, url, word_count) {
        return api.post(storyUrl, {title, notes, url, word_count});
    },
    delete(id) {
        return api.delete(storyUrl + "/delete/" + id);
    }
}