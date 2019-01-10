<template>
    <div>
        <ErrorAlert :error="error" :errorMessage="errorMessage"/>
        <form v-on:submit.prevent="createStory">
            <div class="form-group row">
                <label for="title" class="col-sm-2 col-form-label">Title</label>
                <div class="col-sm-8">
                <input v-model="title" type="text" class="form-control" placeholder="Title" required maxlength="100">
                </div>
            </div>
            <div class="form-group row">
                <label for="intent" class="col-sm-2 col-form-label">Notes</label>
                <div class="col-sm-8">
                <textarea v-model="notes" type="text" class="form-control beta-textarea" placeholder="I want to improve my ..." required maxlength="1000"></textarea>
                </div>
            </div>
            <div class="form-group row">
                <label for="intent" class="col-sm-2 col-form-label">Word Count</label>
                <div class="col-sm-8">
                    <input v-model="word_count" type="number" class="form-control" placeholder="2000" min="1" max="50000" required maxlength="5">
                </div>
                <div class="col-sm-1">
                    <div class="betame-tooltip"><font-awesome-icon icon="info-circle" class="font18" />
                        <span class="betame-tooltiptext">
                            Inside your Google Doc, click <strong class="text-info">Tools</strong>, then click <strong class="text-info">Word Count</strong>.
                        </span>
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <label for="url" class="col-sm-2 col-form-label">Google Doc Link</label>
                <div class="col-sm-8">
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
                <div class="col-sm-1">
                    <div class="betame-tooltip"><font-awesome-icon icon="info-circle" class="font18" />
                        <span class="betame-tooltiptext">
                            Inside your Google doc, click <strong class="text-info">SHARE</strong> in the top right corner, then click <strong class="text-info">Get shareable link</strong>. Select the permission <strong class="text-info">Anyone with the link can comment</strong> and copy the link here.
                        </span>
                    </div>
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
import debounce from 'debounce'
import google from '../services/google.js'
import story from '../services/story.js'
import ErrorAlert from '../components/ErrorAlert.vue'

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
            word_count: '',
            isCreating: false,
            error: null,
            errorMessage: '',
            invalidGoogleLink: false,
            invalidGoogleDoc: false,
            invalidInput: false
        };
    },
    methods: {
        createStory() {
            let isValid = this.validateInput()

            if (!isValid) {
                if(!this.error && !this.errorMessage) {
                    this.errorMessage = "Your input is invalid"
                }
                return
            }

            this.error = null;
            this.isCreating = true;

            story.create(this.title, this.notes, this.url, this.word_count)
                .then(response => {
                    Event.$emit('createdStory', response.data);
                })
                .catch(error => {
                    this.error = error;
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

        },
        validateInput() {
            this.title = this.title.trim()
            if(!this.title) {
                this.errorMessage = 'Title is required.'
                return false
            } else if(this.title.length > 100) {
                this.errorMessage = 'Title must be less than 100 characters.'
                return false
            }

            this.notes = this.notes.trim()
            if(!this.notes) {
                this.errorMessage = 'Notes are required.'
                return false
            } else if(this.notes.length > 1000) {
                this.errorMessage = 'Notes must be less than 1000 characters.'
                return false
            }

            this.url = this.url.trim()
            if(!this.url) {
                this.errorMessage = 'Google Docs link is required.'
                return false
            } else if(this.url.length > 200) {
                this.errorMessage = 'Google Docs link must be less than 200 characters.'
                return false
            }

            this.word_count = this.word_count.trim()
            let wordCount = parseInt(this.word_count)
            if(!wordCount) {
                this.errorMessage = 'Word count is required.'
                return false
            } else if(wordCount > 50000) {
                this.errorMessage = 'Word count must be less than 50,000.'
                return false
            } else if(wordCount < 1) {
                this.errorMessage = 'Word count must be greater than 0.'
                return false
            }

            return true
        }
    },
    created() {
        this.checkGoogleLink = debounce(this.checkGoogleLink, 300)
    }
}
</script>

<style scoped>
.beta-textarea {
    height: 130px;
}
</style>
