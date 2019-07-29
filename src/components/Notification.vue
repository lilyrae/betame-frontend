<template>
    <li class="list-group-item bg-light beta-link" @click="redirect">
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
        <span v-if="showDate" class="float-right grey">
            {{ notification.created_at | formatDate }}
        </span>
    </li>
</template>

<script>
export default {
    name: 'Notification',
    props: {
        notification: Object,
        showDate: {
            type: Boolean,
            default:false
        }
    },
    methods: {
        redirect () {
            let route = ''

            if (this.isForKarma) {
                route = `/me/cookies?karma_id=${this.notification.karma_id}`
            } else {
                route = `/story/${this.notification.story.story_id}?comment_id=${this.notification.comment_id}`
            }
            this.$store.dispatch('notification/clearNotifications', [this.notification.notification_id])
            this.$router.push(route)
        }
    },
    computed: {
        username () {
            return this.notification.from_user.username
        },
        storyTitle () {
            return this.notification.story.title
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
