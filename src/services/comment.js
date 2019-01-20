import api from './betame.api'

const commentUrl = "/comment";

export default {
    create(story_id, parent_id, text) {
        return api.post(commentUrl, {story_id, parent_id, text});
    },
    delete(id) {
        return api.delete(commentUrl + "/delete/" + id);
    }
}