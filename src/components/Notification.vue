<template>
    <router-link
        class="list-group-item bg-light beta-link"
        :to="link">
        <span v-if="isForStoryComment">
            <font-awesome-icon icon="book-open" />
            {{ username | capitalise }} commented on your story, {{ storyTitle | fullStop }}
        </span>
        <span v-else-if="isForReplyComment">
            <font-awesome-icon icon="comments" />
            {{ username | capitalise }} replied to your comment on {{ storyTitle | fullStop }}
        </span>
        <span v-else-if="isForKarma">
            <font-awesome-icon class="golden cookie" icon="cookie" />
            {{ username | capitalise }} gifted you a cookie to say thank you for your help on {{ storyTitle | fullStop }}
        </span>
    </router-link>
</template>

<script>
export default {
    name: 'Notification',
    props: {
        notification: Object
    },
    computed: {
        username () {
            return this.notification.from_user.username
        },
        storyTitle () {
            return this.notification.story.title
        },
        link () {
            if (this.isForKarma) {
                return `/me/cookies`
            }
            return `/story/${this.notification.story.story_id}?comment_id=${this.notification.comment_id}`
        },
        isForStoryComment() {
            return this.notification.notification_type === 'story_comment'
        },
        isForReplyComment() {
            return this.notification.notification_type === 'reply_comment'
        },
        isForKarma() {
            return this.notification.notification_type === 'karma'
        }
    }
}
</script>
