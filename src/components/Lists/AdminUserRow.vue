<template>
    <li class="list-group-item">
        <div class="row">
            <div class="col-8">
                <h5>{{ user.username }}</h5>
            </div>
            <div class="col-4">
                {{ user.created_at | formatDate }}
            </div>
        </div>
        <div class="row">
            <div class="col-sm-8 col-5">
                <span><font-awesome-icon class="purple" icon="comments" />&nbsp;{{ user.comment_count }}&nbsp;</span>
                <span><font-awesome-icon class="golden" icon="cookie" />&nbsp;{{ user.karma_count }}</span>
            </div>
            <div class="col-sm-4 col-7">
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
            </div>
        </div>
    </li>
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
    }
}
</script>
