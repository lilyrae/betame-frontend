import api from './betame.api'

const commentUrl = "/comment";

export default {
    create(story_id, parent_id, text) {
        return api.post(commentUrl, {story_id, parent_id, text});
    },
    edit(id, text) {
        return api.post(commentUrl + "/edit/" + id, {text});
    }
}