<template>
    <Admin>
        <br>
        <TitleNavBar title="Users" />
        <ErrorAlert :error="error"/>
        <Alert :message="alertMessage" />
        <BaseNavBar>
            <button class="btn btn-info" @click="generateInvite">Generate Invite</button>
        </BaseNavBar>
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
import BaseNavBar from '../../components/NavBars/BaseNavBar.vue'
import UserRow from '../../components/Lists/AdminUserRow.vue'
import ErrorAlert from '../../components/ErrorAlert.vue'
import Alert from '../../components/Alert.vue'
import LoadingRipple from '../../components/LoadingRipple.vue'
import admin from '../../services/admin.js'

export default {
    name: 'Users',
    components: {
        Admin,
        TitleNavBar,
        BaseNavBar,
        UserRow,
        ErrorAlert,
        Alert,
        LoadingRipple
    },
    data() {
        return {
            users: [],
            error: null,
            alertMessage: '',
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
        },
        generateInvite() {
            this.error = null;
            this.isLoadingPage = true;

            admin.generateToken()
                .then((response) => {
                    this.alertMessage = `New token: ${response.data.token}`
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