<template>
    <tr :class="{'alert-danger': points < 0}">
        <template v-if="user.token">
            <th colspan="9">{{ user.token }}</th>
        </template>
        <template v-else>
            <td>{{ user.user_id }}</td>
            <th scope="row">{{ user.username }}</th>
            <td>{{user.email}}</td>
            <td class="purple">{{ user.story_count || 0 }}</td>
            <td class="golden">{{ user.point_count || 0 }}</td>
            <td class="purple">{{ user.comment_count || 0 }}</td>
            <td class="golden">{{ user.karma_count || 0 }}</td>
            <td class="purple">{{ points || 0 }}</td>
            <td>
                <button v-if="!isBanned"
                    @click="ban"
                    class="btn btn-sm btn-warning small-margin ld-ext-right"
                    :class="{'running': isBanning}"
                    :disabled="isBanning" >
                    Ban
                    <div class="ld ld-ring ld-spin"></div>
                </button>
                <button v-else
                    @click="unban"
                    class="btn btn-sm small-margin ld-ext-right"
                    :class="{'running': isBanning}"
                    :disabled="isBanning" >
                    Unban
                    <div class="ld ld-ring ld-spin"></div>
                </button>
                <button class="btn btn-sm btn-danger">Delete</button>
            </td>
            <td>{{ user.created_at | formatDate }}</td>
        </template>
    </tr>
</template>

<script>
import admin from '../../services/admin.js'

export default {
    name: 'AdminUserRow',
    props: {
        user: Object
    },
    data() {
        return {
            isBanned: false,
            isBanning: false
        }
    },
    created () {
        this.isBanned = this.user.is_banned
    },
    methods: {
        ban() {
            this.isBanning = true;

            admin.banUser(this.user.user_id)
                .then(() => {
                    this.isBanned = true
                }).catch(error => {
                    this.$emit('error', {error})
                }).finally(() => {
                    this.isBanning = false;
                });
        },
        unban() {
            this.error = null;
            this.isBanning = true;

            admin.unbanUser(this.user.user_id)
                .then(() => {
                    this.isBanned = false
                }).catch(error => {
                    this.$emit('error', {error})
                }).finally(() => {
                    this.isBanning = false;
                });
        }
    },
    computed: {
        points() {
            let points = this.user.point_count
            if (points > 0) {
                points = points + 1;
            }
            let stories = this.user.story_count || 0
            return points - stories
        }
    }
}
</script>
