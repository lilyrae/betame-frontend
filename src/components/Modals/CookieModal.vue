<template>
    <Modal @closeModal="closeCookieModal" :isVisible="showCookieModal" v-if="cookieUser">
        <template slot="header">Give a Cookie to {{ cookieUser.username }}</template>
        <p class="font18">To say thank you for reviewing your story, give your beta a cookie! You can also add a message to make it an extra special treat.</p>
        <textarea class="form-control beta-textarea" v-show="addMessage" v-model="cookieMessage"></textarea>
        <div class="form-check" v-show="addMessage">
            <input type="checkbox" class="form-check-input betame-checkbox" v-model="isPublic">
            <label class="form-check-label font16">Show message publicly as a comment</label>
        </div>
        <template slot="footer">
            <button v-if="!addMessage" @click="addMessageToCookie" class="btn">Add Message <font-awesome-icon class="betame-red" icon="heart" /></button>
            <button class="btn" @click="sendCookie">
                <span v-if="!addMessage">Give Cookie</span>
                <span v-else>Send&nbsp;<font-awesome-icon class="betame-red" icon="heart" /></span>
                &nbsp;<font-awesome-icon class="golden" icon="cookie-bite" />
            </button>
        </template>
    </Modal>
</template>

<script>
import Modal from './Modal.vue'
import karma from '../../services/karma.js'
import { EventBus } from '../../event-bus.js'

export default {
    name: 'CookieModal',
    components: {
        Modal
    },
    props: {
        storyId: String
    },
    data() {
        return {
            showCookieModal: false,
            addMessage: false,
            cookieMessage: '',
            cookieUser: null,
            isAnonymousCookie: false,
            isPublic: false,
            commentId: null
        }
    },
    created() {
        EventBus.$on('showCookieModal', ({user, commentId}) => {
            this.cookieUser = user
            this.commentId = commentId
            this.showCookieModal = true
        })
    },
    methods: {
        addMessageToCookie () {
            this.addMessage = true
            this.isPublic = true
        },
        sendCookie() {
            this.$emit('startLoading')
            let responseTo = this.isPublic && this.cookieMessage != '' ? this.commentId : '' 
            karma.create(this.storyId, this.cookieUser.user_id, this.cookieMessage, this.isAnonymousCookie, responseTo)
                .then(() => {
                    // TO DO show success
                    this.closeCookieModal()
                    this.$emit('refresh')
                }).catch((errorResponse) => {
                    let error = errorResponse || 'Failed to gift a cookie'
                    this.$emit('commentsError', error)
                })
        },
        closeCookieModal() {
            this.showCookieModal = false
            this.addMessage = false
            this.cookieMessage = ''
        }
    },
    beforeDestroy() {
        EventBus.$off('showCookieModal')
    }
}
</script>

<style scoped>
.betame-checkbox {
    margin-top: 10px;
}
</style>