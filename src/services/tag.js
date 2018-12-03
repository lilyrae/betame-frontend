import api from './betame.api'

const tagUrl = "/tag";

export default {
    search(tag_type_id) {
        return api.get(tagUrl, {tag_type_id});
    },
    searchWithText(text, tag_type_id) {
        return api.get(tagUrl, {tag_type_id, text});
    },
    addToStory(story_id, tagIds, customTexts) {
        // make arrays into strings
        let tags = tagIds.join(",");
        let new_tags = customTexts.join(",");

        return api.post("/story" + tagUrl, {
            story_id,
            tags, 
            new_tags 
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
    },
    helpTagTypeId() {
        return 5;
    }
}