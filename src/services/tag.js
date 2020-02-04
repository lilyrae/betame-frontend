import api from './betame.api'

const tagUrl = "/tag";

export default {
    search(tag_type_id) {
        return api.get(tagUrl, {tag_type_id});
    },
    searchWithText(text, tag_type_id) {
        const params = {text};
        if (tag_type_id) {
            params.tag_type_id = tag_type_id
        }
        return api.get(tagUrl, params);
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
    },
    tagClass(typeId) {
        return {
            'beta-grey-badge': typeId == this.languageTagTypeId(),
            'beta-blue-badge': typeId == this.topicTagTypeId(),
            'badge-info': typeId == this.helpTagTypeId(),
            'beta-dark-blue-badge': typeId == this.customTagTypeId()
        }
    }
}