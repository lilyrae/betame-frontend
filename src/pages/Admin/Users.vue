<template>
    <Admin>
        <br>
        <TitleNavBar title="Users" />
        <ErrorAlert :error="error"/>
        <div class="alert alert-success" v-if="newToken">
            <strong>Success!</strong>&nbsp;
            Here is your invite https://beta-me.io/#/invite/{{ newToken }} :D<br>
            Let me know if you have any problems or suggestions! I'm always working on improving the site :)<br>
            <router-link :to="inviteLink">Check Link</router-link>
        </div>
        <div class="card bg-light admin-nav">
            <div class="card-body text-left">
                <button class="btn btn-info" @click="generateInvite">Generate Invite</button>
                <a :href="csvData" download="betame-users.csv" class="btn btn-info">Export CSV</a>
                <toggle-button v-model="showTokens"
                    class="toggle"
                    :sync="true"
                    :labels="{checked: 'SHOW', unchecked: 'HIDE'}"/> Tokens
            </div>
        </div>
        <div v-if="isLoadingPage">
            <LoadingRipple />
        </div>
        <div v-else-if="users.length > 0">
            <p class="text-muted">Results: {{ filteredUsers.length }} users, {{ users.length }} total (includes tokens)</p>
            <table class="table table-responsive">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col"><font-awesome-icon class="purple" icon="book-open" /></th>
                        <th scope="col"><font-awesome-icon class="golden" icon="comments" /></th>
                        <th scope="col"><font-awesome-icon class="purple" icon="comments" /></th>
                        <th scope="col"><font-awesome-icon class="golden" icon="cookie" /></th>
                        <th scope="col"><font-awesome-icon class="purple" icon="mug-hot" /></th>
                        <th scope="col">Actions</th>
                        <th scope="col">Created</th>
                    </tr>
                </thead>
                <tbody>
                    <UserRow v-for="(user, index) in displayUsers" :user="user" :key="index" />
                </tbody>
            </table>
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
import Alert from '../../components/Alert.vue'
import LoadingRipple from '../../components/LoadingRipple.vue'
import admin from '../../services/admin.js'

export default {
    name: 'Users',
    components: {
        Admin,
        TitleNavBar,
        UserRow,
        ErrorAlert,
        Alert,
        LoadingRipple
    },
    data() {
        return {
            users: [],
            error: null,
            newToken: '',
            isLoadingPage: false,
            showTokens: false
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
                    this.newToken = response.data.token
                }).catch(error => {
                    this.error = error;
                }).finally(() => {
                    this.isLoadingPage = false;
                });
        }
    },
    computed: {
        csvData() {
            let firstLine = "data:text/csv;charset=utf-8,username,story_count,root_comment_count,total_comment_count,cookie_count\n" 
            let content = this.filteredUsers.map(user => {
                return `${user.username},${user.story_count || 0},${user.point_count || 0},${user.comment_count || 0},${user.karma_count || 0}`
            }).join("\n");
            return encodeURI(firstLine + content);
        },
        inviteLink() {
            if (this.newToken) {
                return `/invite/${this.newToken}`
            }
            return null
        },
        filteredUsers() {
            return this.users.filter(user => {
                return user.username != null || user.username != undefined
            })
        },
        displayUsers() {
            if (this.showTokens) {
                return this.users
            }
            return this.filteredUsers
        }
    }
}
</script>

<style scoped>
.purple {
    color: #7C77B9
}

.admin-nav button {
    margin: 4px;
}
</style>
