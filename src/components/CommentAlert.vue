<template>
    <div class="comment-alert">
        <div class="toast alert-danger"
            :class="{ 'show' : showToast, 'alert-danger' : isError, 'alert-success': isSuccess }"
        >
            <div class="toast-header" :class="{ 'alert-danger' : isError, 'alert-success': isSuccess }">
                <strong class="mr-auto">
                    <span v-if="isError">Error</span>
                    <span v-else-if="isSuccess">Success</span>
                </strong>
                <button type="button" class="ml-2 mb-1 close" aria-label="Close" @click="hide">
                <span >&times;</span>
                </button>
            </div>
            <div class="toast-body" :class="{ 'alert-danger' : isError, 'alert-success': isSuccess }">{{ message }}</div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'CommentAlert',
    data () {
        return {
            showToast: false
        }
    },
    methods: {
        hide () {
            this.showToast = false
        }
    },
    computed: {
        ...mapGetters('comments', [
            'message',
            'isSuccess',
            'isError'
        ])
    },
    watch: {
        message () {
            this.showToast = (this.message != '')

            setTimeout(() => {
                this.showToast = false
            }, 5000)
        }
    }
}
</script>

<style>
.toast .alert-danger {
    color: #721c24 !important;
    background-color: #f8d7da !important;
    border-color: #f5c6cb !important;
}

.toast .alert-success {
    color: #155724 !important;
    background-color: #d4edda !important;
    border-color: #c3e6cb !important;
}

.comment-alert {
    position: fixed;
    top: 70px;
    right: 20px;
    z-index: 1050;
}
</style>