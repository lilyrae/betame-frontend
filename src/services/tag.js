import api from './betame.api'

const tagUrl = "/tag";
var qs = require('qs');

export default {
    search(tag_type_id) {
        return api.get(tagUrl + "?tag_type_id=" + tag_type_id);
    },
    searchWithText(text, tag_type_id) {
        return api.get(tagUrl+ "?tag_type_id=" + tag_type_id + "&text=" + text);
    },
    create(tag_type_id, text) {
        return api.post(tagUrl, qs.stringify({tag_type_id, text}), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    addToStory(tags) {
        return api.post("/story" + tagUrl, qs.stringify({tags}), {
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