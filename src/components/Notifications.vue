<template>
    <div class="beta-notifications">
        <button class="btn btn-info" @click="showNotifications">
            <font-awesome-icon :icon="bellIcon" />
            <span v-if="notifications.length > 0" class="badge badge-light">{{ Object.keys(notifications).length }}</span>            
        </button>
        <ul class="menu list-group" v-show="showDropdown && notifications.length > 0">
            <Notification v-for="notifications in notifications" :key="notifications.notification_id" :notification="notifications" />
            <li class="list-group-item bg-light beta-link">
                <button @click="clearNotifications" class="btn btn-secondary">Clear</button>
                <router-link to="/me/notifications" class="btn betame-button">History</router-link>
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
        clearNotifications() {
            let notificationIds = this.notifications.map((notification) => {
                return notification.notification_id
            })
            this.$store.dispatch('notification/clearNotifications', notificationIds)
        }
    },
    computed: {
        ...mapGetters('notification', ['notifications']),
        screenWidth() {
            let body = document.getElementsByTagName('body')[0]
            return window.innerWidth || document.documentElement.clientWidth || body.clientWidth
        },
        bellIcon() {
            if(this.notifications.length <= 0 || this.showDropdown) {
                return ['far', 'bell']
            }
            return 'bell'
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
