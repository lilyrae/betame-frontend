<template>
    <div>
        <ErrorAlert :error="error"/>
        <form v-on:submit.prevent="createStory">
            <div class="form-group row">
                <label for="title" class="col-md-2 col-form-label">Title</label>
                <div class="col-md-8">
                <input v-model="title" type="text" class="form-control" placeholder="Title" required maxlength="100">
                </div>
            </div>
            <div class="form-group row">
                <label for="intent" class="col-md-2 col-form-label">Notes</label>
                <div class="col-md-8">
                <textarea v-model="notes" type="text" class="form-control beta-textarea" placeholder="What are you working on? What do you want help with?" required maxlength="1000"></textarea>
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
                    <input v-model="word_count" type="number" class="form-control" placeholder="2000" min="1" max="50000" required maxlength="5">
                </div>
                <div class="col-md-1">
                    <div class="betame-tooltip"><font-awesome-icon icon="info-circle" class="font18" />
                        <span class="betame-tooltiptext">
                            Inside your Google Doc, click <strong class="text-info">Tools</strong>, then click <strong class="text-info">Word Count</strong>.
                        </span>
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <label for="url" class="col-md-2 col-form-label">Google Doc Link</label>
                <div class="col-md-8">
                    <input v-model="url" type="url" @keyup="checkGoogleLink" class="form-control" :class="{'is-invalid' : invalidGoogleLink}" aria-describedby="urlHelpBlock" placeholder="https://docs.google.com/document/d/1dtISZ-L0GSyAtqce_fraDIg2ER0EuRxVIoFXfxPXDx8/edit?usp=sharing" required>
                    <div v-show="invalidGoogleLink" class="invalid-feedback text-left">
                        <span v-if="invalidGoogleDoc">
                            This link does not seem correct. Did you make the Google Doc public?
                        </span>
                        <span v-else>
                            Please provide a valid Google Doc link.
                        </span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 offset-md-2 alert alert-info">
                    <span class="betame-tooltiptext">
                        <font-awesome-icon icon="info-circle" class="font18" />
                        Inside your Google doc, click <strong>SHARE</strong> in the top right corner, then click <strong>Get shareable link</strong>. Select the permission <strong>Anyone with the link can comment</strong> and copy the link here.
                    </span>
                </div>
            </div>
            <br>
            <button type="submit" class="btn btn-lg betame-dark-button ld-ext-right"
                :class="{'running': isCreating }"
                >
                Create 
                <font-awesome-icon icon="pen-nib" />
                <div class="ld ld-ring ld-spin"></div>
            </button>
        </form>
    </div>
</template>

<script>
import ErrorAlert from '../ErrorAlert.vue'
import google from '../../services/google.js'
import story from '../../services/story.js'
import ratingService from '../../services/rating.js'
import debounce from 'debounce'

export default {
    name: 'StoryForm',
    components: {
        ErrorAlert
    },
    data() {
        return {
            title: '',
            notes: '',
            url: '',
            selectedRating: '',
            word_count: '',
            isCreating: false,
            error: '',
            invalidGoogleLink: false,
            invalidGoogleDoc: false
        };
    },
    methods: {
        createStory() {
            this.error = '';
            this.isCreating = true;

            story.create(this.title, this.notes, this.selectedRating, this.url, this.word_count)
                .then(response => {
                    Event.$emit('createdStory', response.data);
                    this.$store.cache.delete('story/fetchStories') // clear all stories
                    this.$store.cache.delete('account/fetchStories') // clear user's stories
                    this.$store.dispatch('account/fetchUser')
                })
                .catch(error => {
                    this.error = error || 'Failed to create a new story';
                })
                .finally(() => {
                    this.isCreating = false;
                });
        },
        checkGoogleLink() {
            this.invalidGoogleDoc = false;
            this.invalidGoogleLink = false;

            if(this.url == "") {
                return;
            }

            if(!google.isGoogleDocsLink(this.url)) {
                this.invalidGoogleLink = true;
                return;
            }
            
            google.docHeaders(this.url)
                .catch(() => {
                    this.invalidGoogleDoc = true;
                    this.invalidGoogleLink = true;
                })

        }
    },
    created() {
        this.checkGoogleLink = debounce(this.checkGoogleLink, 300)
    },
    computed: {
        ratingOptions() {
            return ratingService.all();
        }
    }
}
</script>

<style scoped>
.beta-textarea {
    height: 130px;
}

.beta-select option {
    padding: 3px;
}
</style>
