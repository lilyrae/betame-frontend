<template>
    <Admin>
        <br>
        <TitleNavBar title="Topic Tags" />
        <ErrorAlert :error="error" />
        <Alert :message="alertMessage" />
        <BaseNavBar>
            <form class="row" v-on:submit.prevent="createTopicTag">
            <div class="form-group col-8">
                <input v-model="newTopicTag" type="text" class="form-control" placeholder="Topic Tag" required maxlength="50">
            </div>
            <div class="form-group col-2">
                <button type="submit" class="btn btn-info">Create New</button>
            </div>
            </form>
        </BaseNavBar>
        <div v-if="isLoading">
            <LoadingRipple />
        </div>
        <div v-else-if="topicOptions.length > 0">
            <div class="card text-left">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item" v-for="tag in topicOptions" :key="tag.tag_id">
                        {{ tag.text }}
                    </li>
                </ul>
            </div>
        </div>
        <br>
    </Admin>
</template>

<script>
import Admin from '../../layouts/Admin.vue'
import TitleNavBar from '../../components/NavBars/TitleNavBar.vue'
import BaseNavBar from '../../components/NavBars/BaseNavBar.vue'
import ErrorAlert from '../../components/ErrorAlert.vue'
import Alert from '../../components/Alert.vue'
import LoadingRipple from '../../components/LoadingRipple.vue'
import tagService from '../../services/tag.js'
import { mapGetters } from 'vuex'

export default {
    name: 'Users',
    components: {
        Admin,
        TitleNavBar,
        BaseNavBar,
        ErrorAlert,
        Alert,
        LoadingRipple
    },
    data () {
        return {
            newTopicTag: '',
            alertMessage: ''
        }
    },
    created() {
        this.$store.cache.dispatch('storytags/fetchTagOptions', {tagTypeId: tagService.topicTagTypeId()})
    },
    methods: {
        async createTopicTag() {
            await this.$store.dispatch('storytags/createNewTag', {tagTypeId: tagService.topicTagTypeId(), tagText: this.newTopicTag})
            await this.$store.dispatch('storytags/fetchTagOptions', {tagTypeId: tagService.topicTagTypeId()})

            if (!this.error) {
                this.alertMessage = `Successfully created tag: ${this.newTopicTag}`
                this.newTopicTag = ''
            }
        }
    },
    computed: {
        ...mapGetters('storytags', [
            'topicOptions'
        ]),
        ...mapGetters('api', [
            'error',
            'isLoading'
        ]),
    }
}
</script>

