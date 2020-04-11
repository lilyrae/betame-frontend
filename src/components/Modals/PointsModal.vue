<template>
    <Modal @closeModal="closeModal" :isVisible="showModal">
        <template slot="header"><font-awesome-icon icon="mug-hot" /> What are Cups of Tea?</template>
        <div class="font18">
            <p>Cups of tea allow you to publish stories on BetaMe!</p>
            <p>You need <strong><u>one cup of tea</u></strong> to publish <strong><u>one story.</u></strong></p>
            <p>You can get tea in different ways by engaging with the website</p>
            <p>When you <strong><u>leave useful feedback</u></strong> on someone's story (i.e. not a reply to another comment), you will <strong><u>get one cup of tea</u></strong>.</p>
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
