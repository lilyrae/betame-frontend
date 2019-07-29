<template>
    <Account>
        <TitleNavBar class="big-margin" title="Notifications" />
        <ErrorAlert :error="error"/>
        <div v-if="isLoading">
            <LoadingRipple />
        </div>
        <div v-if="notifications.length > 0" class="card notification-list">
            <ul class="list-group list-group-flush text-left">
                <Notification v-for="notification in notifications" :key="notification.notification_id" :notification="notification" :showDate="true"/>
            </ul>
        </div>
        <div v-if="notificationHistory.length > 0" class="card notification-list">
            <ul class="list-group list-group-flush text-left">
                <Notification v-for="notification in notificationHistory" :key="notification.notification_id" :notification="notification" :showDate="true"/>
            </ul>
        </div>
        <div v-if="notifications.length <= 0 && notificationHistory.length <= 0">
            You have no notifications yet!
        </div>
    </Account>
</template>

<script>
import Account from '../../layouts/Account.vue'
import TitleNavBar from '../../components/NavBars/TitleNavBar.vue'
import Notification from '../../components/Notification.vue'
import ErrorAlert from '../../components/ErrorAlert.vue'
import LoadingRipple from '../../components/LoadingRipple.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'Home',
    components: {
        Account,
        TitleNavBar,
        Notification,
        ErrorAlert,
        LoadingRipple
    },
    created () {
        this.$store.dispatch('notification/fetchHistory')
    },
    computed: {
        ...mapGetters('api', ['error', 'isLoading']),
        ...mapGetters('notification', ['notifications', 'notificationHistory'])
    }
}
</script>

<style scoped>
.notification-list {
    margin: 40px;
}
</style>

