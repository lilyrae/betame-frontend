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
    addToStory(storyId, tagIds, topicTexts, customTexts) {
        let tags = tagIds.join(";");
        let topic_tag_texts = topicTexts.join(";");
        let custom_tag_texts = customTexts.join(";");

        // make arrays into strings
        return api.post("/story" + tagUrl, qs.stringify({
                story_id: storyId,
                tags, 
                topic_tag_texts,
                custom_tag_texts 
            }), {
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