import api from './betame.api'

const storyUrl = "/story";
var qs = require('qs');

export default {
    all() {
        return api.get(storyUrl);
    },
    byId(id) {
        return api.get(storyUrl + "/" + id);
    },
    withUserID(userId) {
        return api.get(storyUrl + "?user_id=" + userId);
    },
    create(title, notes, url, word_count) {
        return api.post(storyUrl, qs.stringify({title, notes, url, word_count}), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    delete(id) {
        return api.delete(storyUrl + "/delete/" + id);
    }
}