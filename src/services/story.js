import api from './betame.api'

const storyUrl = "/story";

export default {
    all(limit, offset) {
        return api.get(storyUrl, {limit, offset});
    },
    byId(id) {
        return api.get(`${storyUrl}/${id}`);
    },
    withUserID(user_id, limit, offset) {
        return api.get(storyUrl, {user_id, limit, offset});
    },
    create(title, notes, rating, url, word_count) {
        return api.post(storyUrl, {title, notes, rating, url, word_count});
    },
    edit(id, notes, rating, word_count) {
        return api.post(`${storyUrl}/edit/${id}`, {notes, rating, word_count});
    },
    delete(id) {
        return api.delete(`${storyUrl}/delete/${id}`);
    },
    togglePrivacy(id, is_private) {
        return api.post(`${storyUrl}/privacy/${id}`, {is_private});
    },
    search(title, user_ids, ratings, tags, published_from, published_to, min_word_count, max_word_count, limit, offset) {
        let params = { limit, offset }
        if (title) {
            params.title = title
        }
        if (user_ids) {
            params.user_ids = user_ids
        }
        if (ratings) {
            params.ratings = ratings
        }
        if (tags) {
            params.tags = tags
        }
        if (published_from) {
            params.published_from = published_from
        }
        if (published_to) {
            params.published_to = published_to
        }
        if (min_word_count) {
            params.min_word_count = min_word_count
        }
        if (max_word_count) {
            params.max_word_count = max_word_count
        }
        return api.get(`${storyUrl}/search`, params);
    }
}