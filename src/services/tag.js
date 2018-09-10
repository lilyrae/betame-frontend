import api from './betame.api'

const tagUrl = "/tag";
var qs = require('qs');

export default {
    search(tag_type_id) {
        return api.get(tagUrl, {tag_type_id});
    },
    searchWithText(text, tag_type_id) {
        return api.get(tagUrl, {tag_type_id, text});
    },
    create(tag_type_id, user_id, text) {
        return api.post(tagUrl, qs.stringify({tag_type_id, user_id, text}), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    languageTagTypeId() {
        return 1;
    },
    topicTagTypeId() {
        return 2;
    },
    ratingTagTypeId() {
        return 3;
    },
    customTagTypeId() {
        return 4;
    }
}