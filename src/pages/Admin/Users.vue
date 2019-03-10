<template>
    <Admin>
        <br>
        <TitleNavBar title="Users" />
        <ErrorAlert :error="error"/>
        <div v-if="isLoadingPage">
            <LoadingRipple />
        </div>
        <div v-else-if="users.length > 0">
            <div class="card text-left">
                <ul class="list-group list-group-flush">
                    <UserRow v-for="(user, index) in users" :user="user" :key="index" />
                </ul>
            </div>
        </div>
        <div v-else>
            No users yet!
        </div>
    </Admin>
</template>

<script>
import Admin from '../../layouts/Admin.vue'
import TitleNavBar from '../../components/NavBars/TitleNavBar.vue'
import UserRow from '../../components/Lists/AdminUserRow.vue'
import ErrorAlert from '../../components/ErrorAlert.vue'
import LoadingRipple from '../../components/LoadingRipple.vue'
import admin from '../../services/admin.js'

export default {
    name: 'Users',
    components: {
        Admin,
        TitleNavBar,
        UserRow,
        ErrorAlert,
        LoadingRipple
    },
    data() {
        return {
            users: [],
            error: null,
            isLoadingPage: false
        }
    },
    created() {
        this.getUsers()
    },
    methods: {
        getUsers() {
            this.error = null;
            this.isLoadingPage = true;

            admin.users()
                .then(response => {
                    this.users = response.data
                }).catch(error => {
                    this.error = error;
                }).finally(() => {
                    this.isLoadingPage = false;
                });
        }
    }
}
</script>

<style scoped>
.purple {
    color: #7C77B9
}

</style>
