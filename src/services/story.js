import api from './betame.api'

const storyUrl = "/story";
var qs = require('qs');

export default {
    all() {
        return api.get(storyUrl);
    },
    withUserID(userId) {
        return api.get(storyUrl, {userId});
    },
    create(title, notes, url, word_count) {
        return api.post(storyUrl, qs.stringify({title, notes, url, word_count}), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }
}