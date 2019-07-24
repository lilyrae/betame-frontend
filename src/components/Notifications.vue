<template>
    <div class="beta-notifications">
        <button class="btn btn-info" @click="showNotifications">
            <font-awesome-icon icon="bell" />
            <span v-if="notifications.length > 0" class="badge badge-light">{{ Object.keys(notifications).length }}</span>            
        </button>
        <ul class="menu list-group" v-show="showDropdown">
            <Notification v-for="notifications in notifications" :key="notifications.notification_id" :notification="notifications" />
            <li class="list-group-item bg-light beta-link">
                <button class="btn btn-secondary">Clear</button>
                <button class="btn betame-button">History</button>
            </li>
        </ul>
    </div>
</template>

<script>
import Notification from './Notification.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'Notifications',
    components: {
        Notification
    },
    data() {
        return {
            showDropdown: false
        }
    },
    created () {
        this.$store.dispatch('notification/fetchNotifications')
    },
    methods: {
        showNotifications() {
            this.showDropdown = !this.showDropdown
        },
        link (notification) {
            if (this.isForKarma(notification)) {
                return `/me/cookies`
            }
            return `/story/${notification.story.story_id}`
        },
        isForStoryComment(notification) {
            return notification.notification_type === 'story_comment'
        },
        isForReplyComment(notification) {
            return notification.notification_type === 'reply_comment'
        },
        isForKarma(notification) {
            return notification.notification_type === 'karma'
        },
        clear() {
            this.$store.dispatch('notification/clearNotifications')
        },
        history() {
            this.$router.push('/me/notifications')
        }
    },
    computed: {
        ...mapGetters('notification', ['notifications']),
        bellIcon () {
            return this.showDropdown ?  ['far', 'bell'] : 'bell'
        },
        screenWidth() {
            let body = document.getElementsByTagName('body')[0]
            return window.innerWidth || document.documentElement.clientWidth || body.clientWidth
        }
    }
}
</script>

<style>
.beta-notifications {
    position: relative;
    display: inline-block;
}

.beta-notifications .menu {
    margin-top: 4px;
    display: block;
    position: absolute;
    z-index: 1;
    min-width: 215px;
}

.beta-notifications .list-group-item {
    padding: 5px 10px;
    text-align: left;
}

.beta-notifications .list-group-item .btn {
    margin: 0 10px;
    width: 75px;
}

.beta-notifications .list-group-item:hover {
    background-color: blue;
    cursor: pointer;
}

.beta-notifications .badge {
    margin-left: 10px;
}

@media (max-width: 992px) {
    .beta-notifications .menu {
        right: -70px;
    }
}

</style>
