<template>
    <div>
        <ErrorAlert :error="error"/>
        <form v-on:submit.prevent="createStory">
            <div class="form-group row">
                <label for="title" class="col-sm-2 col-form-label">Title</label>
                <div class="col-sm-9">
                <input v-model="title" type="text" class="form-control" placeholder="Title" required>
                </div>
            </div>
            <div class="form-group row">
                <label for="intent" class="col-sm-2 col-form-label">Notes</label>
                <div class="col-sm-9">
                <textarea v-model="notes" type="text" class="form-control" placeholder="I want to improve my ..." required></textarea>
                </div>
            </div>
            <div class="form-group row">
                <label for="intent" class="col-sm-2 col-form-label">Word Count</label>
                <div class="col-sm-9">
                <input v-model="word_count" type="number" class="form-control" placeholder="2000" min="1" required>
                </div>
            </div>
            <div class="form-group row">
                <label for="url" class="col-sm-2 col-form-label">Link</label>
                <div class="col-sm-9">
                <input v-model="url" type="url" class="form-control" aria-describedby="urlHelpBlock" placeholder="https://docs.google.com/document/d/1dtISZ-L0GSyAtqce_fraDIg2ER0EuRxVIoFXfxPXDx8/edit?usp=sharing" required>
                <small id="urlHelpBlock" class="form-text text-muted">
                    This is the link to your writing. For Google docs, click <strong>SHARE</strong> in the top right corner, then click <strong>Get shareable link</strong>. Select the permission <strong>Anyone with the link can comment</strong> and copy the link into this box.
                    <br>
                    In the future, we won't be using third party services! This is a temporary measure, thank you for your patience.
                </small>
                </div>
            </div>
            <br>
            <button type="submit" class="btn btn-lg btn-info ld-ext-right"
                :class="{'running': isCreating }"
                >
                Create 
                <i class="fas fa-pen-nib"></i>
                <div class="ld ld-ring ld-spin"></div>
            </button>
        </form>
    </div>
</template>

<script>
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
            error: null
        };
    },
    methods: {
        createStory() {
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
        }
    }
}
</script>