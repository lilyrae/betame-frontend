import api from './betame.api'

const karmaUrl = "/karma";

export default {
    create(story_id, to_user_id, message, is_anonymous) {
        return api.post(karmaUrl, {story_id, to_user_id, message, is_anonymous});
    },
    getForCurrentUser() {
        return api.get(karmaUrl);
    }
}