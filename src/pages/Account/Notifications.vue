<template>
    <Account>
        <TitleNavBar class="big-margin" title="Notifications" />
        <ErrorAlert />
        <div v-if="notifications.length > 0" class="card">
            <ul class="list-group list-group-flush text-left">
                <Notification v-for="notifications in notifications" :key="notifications.notification_id" :notification="notifications" />
            </ul>
        </div>
        <div v-else>
            You have no notifications yet!
        </div>
    </Account>
</template>

<script>
import Account from '../../layouts/Account.vue'
import TitleNavBar from '../../components/NavBars/TitleNavBar.vue'
import Notification from '../../components/Notification.vue'
import ErrorAlert from '../../components/ErrorAlert.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'Home',
    components: {
        Account,
        TitleNavBar,
        Notification,
        ErrorAlert
    },
    created () {
        this.$store.dispatch('notification/fetchNotifications')
    },
    computed: {
        ...mapGetters('notification', ['notifications'])
    }
}
</script>

<style scoped>

</style>

