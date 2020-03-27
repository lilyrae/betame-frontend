<template>
    <Account>
        <div class="jumbotron bg-white edit-story">
            <h4 class="title beta-title hide-overflow">{{ story.title }}</h4>
            <h5 name="subtitle">Edit Your Story</h5>
            <br>
            <ErrorAlert :error="error" />
            <div class="text-left">
                <div class="form-group row">
                    <label for="intent" class="col-md-2 col-form-label">Notes</label>
                    <div class="col-md-8">
                    <textarea v-model="notes" type="text" class="form-control beta-textarea" placeholder="I want to improve my ..." required maxlength="1000"></textarea>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="intent" class="col-md-2 col-form-label">Rating</label>
                    <div class="col-md-8">
                    <select v-model="selectedRating" class="form-control beta-select" required maxlength="1000">
                        <option v-for="rating in ratingOptions" :value="rating.value" :key="rating.value">{{ rating.label }}</option>
                    </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="intent" class="col-md-2 col-form-label">Word Count</label>
                    <div class="col-md-8">
                        <input v-model="wordCount" type="number" class="form-control" placeholder="2000" min="1" max="50000" required maxlength="5">
                    </div>
                    <div class="col-sm-1">
                        <div class="betame-tooltip"><font-awesome-icon icon="info-circle" class="font18" />
                            <span class="betame-tooltiptext">
                                Inside your Google Doc, click <strong class="text-info">Tools</strong>, then click <strong class="text-info">Word Count</strong>.
                            </span>
                        </div>
                    </div>
                </div>
                <br>
                <StoryTagForm :storyId="id" :savedTags="story.tags" colSize="col-sm-8"></StoryTagForm>
                <button type="submit" class="btn btn-lg betame-dark-button ld-ext-right float-right"
                    @click="saveEdit"
                    :class="{'running': isLoading }"
                    >
                    Save 
                    <font-awesome-icon icon="pen-nib" />
                    <div class="ld ld-ring ld-spin"></div>
                </button>
            </div>
        </div>
    </Account>
</template>

<script>
import Account from '../../layouts/Account.vue'
import StoryTagForm from '../../components/Forms/StoryTagForm.vue'
import ErrorAlert from '../../components/ErrorAlert.vue'
import ratingService from '../../services/rating.js'
import { mapGetters } from 'vuex'

export default {
    name: 'EditStory',
    components: {
        Account,
        StoryTagForm,
        ErrorAlert
    },
    props: {
        id: null
    },
    data() {
        return {
            notes: null,
            selectedRating: 1,
            wordCount: null
        }
    },
    created() {
        this.$store.dispatch('story/fetchStory', this.id)
    },
    methods: {
        saveEdit() {
            this.$store.dispatch('story/editStory', {
                storyId: this.id,
                notes: this.notes,
                rating: this.selectedRating,
                wordCount: this.wordCount
            })
            this.$store.cache.delete('account/fetchStories')
        }
    },
    computed: {
        ...mapGetters('story', ['story']),
        ...mapGetters('api', ['isLoading', 'error']),
        ratingOptions() {
            return ratingService.all();
        }
    },
    watch: {
        story(val) {
            // update story once loaded
            this.notes = val.notes
            this.selectedRating = val.rating
            this.wordCount = val.word_count
            this.$store.dispatch('storytags/setTags', val.tags)
        }
    }
}
</script>

<style scoped>
.edit-story textarea {
    min-height: 15vh;
}

.edit-story button {
    margin-bottom: 100px;
}
</style>
