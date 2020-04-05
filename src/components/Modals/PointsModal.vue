<template>
    <Modal @closeModal="closeModal" :isVisible="showModal">
        <template slot="header"><font-awesome-icon icon="seedling" /> What are Seeds?</template>
        <div class="font18">
            <p>Seeds allow you to publish stories on BetaMe!</p>
            <p>You need <strong><u>10 seeds</u></strong> to publish <strong><u>one story.</u></strong></p>
            <p>You can get seeds in different ways by engaging with the website</p>
            <p>But essentially, when you <strong><u>leave direct feedback</u></strong> on someone's story (i.e. not a reply to another comment), you will <strong><u>get 10 seeds</u></strong>.</p>
        </div>
        <template slot="footer">
            <button class="btn btn-light" @click="closeModal">Ok</button>
            <router-link :to="recommendationLink" class="btn btn-danger">Leave Feedback <font-awesome-icon icon="heart" /></router-link>
        </template>
    </Modal>
</template>

<script>
import Modal from './Modal.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'PointsModal',
    components: {
        Modal
    },
    props: {
        showModal: Boolean
    },
    methods: {
        closeModal() {
            this.$emit('close')
        }
    },
    computed: {
        ...mapGetters('story', ['recommendationLink'])
    }
}
</script>
