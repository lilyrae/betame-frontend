import api from './betame.api'

const tagUrl = "/tag";

export default {
    search(tag_type_id) {
        return api.get(tagUrl, {tag_type_id});
    },
    searchWithText(text, tag_type_id) {
        return api.get(tagUrl, {tag_type_id, text});
    },
    save(story_id, tag_id) {
        return api.post(`/story${tagUrl}`, {story_id, tag_id});
    },
    create(tag_type_id, text) {
        return api.post(tagUrl, {text, tag_type_id});
    },
    delete(story_id, tag_id) {
        return api.post(`/story${tagUrl}/delete`, {story_id, tag_id});
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
    },
    helpTagTypeId() {
        return 5;
    }
}