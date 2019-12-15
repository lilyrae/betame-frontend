import api from './betame.api'

const storyUrl = "/story";

export default {
    all() {
        return api.get(storyUrl);
    },
    byId(id) {
        return api.get(`${storyUrl}/${id}`);
    },
    withUserID(user_id) {
        return api.get(storyUrl, {user_id});
    },
    create(title, notes, rating, url, word_count) {
        return api.post(storyUrl, {title, notes, rating, url, word_count});
    },
    edit(id, notes, rating, word_count) {
        return api.post(`${storyUrl}/edit/${id}`, {notes, rating, word_count});
    },
    delete(id) {
        return api.delete(`${storyUrl}/delete/${id}`);
    },
    togglePrivacy(id, is_private) {
        return api.post(`${storyUrl}/privacy/${id}`, {is_private});
    },
    search(user_ids) {
        return api.get(`${storyUrl}/search`, {user_ids});
    }
}