<template>
  <Jumbotron>
    <span slot="title">Create New Story</span>
    <div>
        <form v-on:submit.prevent="createStory">
            <div class="form-group row">
                <label for="title" class="col-sm-2 col-form-label">Title</label>
                <div class="col-sm-9">
                <input type="text" class="form-control" placeholder="Brave New Post" required>
                </div>
            </div>
            <div class="form-group row">
                <label for="intent" class="col-sm-2 col-form-label">Notes</label>
                <div class="col-sm-9">
                <textarea type="text" class="form-control" placeholder="I want to tell a story about.." required></textarea>
                </div>
            </div>
            <div class="form-group row">
                <label for="url" class="col-sm-2 col-form-label">Link</label>
                <div class="col-sm-9">
                <input type="text" class="form-control" aria-describedby="urlHelpBlock" placeholder="https://docs.google.com/document/d/1umopb9lKxII6bwK2GDS0BN1xJg2O4MHrw-dBJTeEqn4/edit?usp=sharing" required>
                <small id="urlHelpBlock" class="form-text text-muted">
                    This is the link to your writing. For Google docs, click <strong>SHARE</strong> in the top right corner, then click <strong>Get shareable link</strong>. Select the permission <strong>Anyone with the link can comment</strong> and copy the link into this box.
                    <br>
                    In the future, we won't be using third party services! This is a temporary measure, thank you for your patience.
                </small>
                </div>
            </div>
            <div class="form-group row">
                <label for="language" class="col-sm-2 col-form-label">Language</label>
                <div class="col-sm-9">
                <v-select id="language-select" v-model="language" :options="languageOptions"></v-select>
                </div>
            </div>
            <div class="form-group row">
                <label for="topics" class="col-sm-2 col-form-label">Topics</label>
                <div class="col-sm-9">
                <v-select id="topic-select" v-model="topics" :options="topicOptions" multiple taggable></v-select>
                </div>
            </div>
            <div class="form-group row">
                <label for="tags" class="col-sm-2 col-form-label">Tags</label>
                <div class="col-sm-9">
                <v-select id="tag-select" v-model="tags" :options="tagOptions" multiple taggable></v-select>
                </div>
            </div>
            <br>
            <button type="button" class="btn btn-lg btn-info">Create</button>
        </form>
    </div>
  </Jumbotron>
</template>

<script>
import Jumbotron from '../templates/Jumbotron.vue'

export default {
    name: 'Me',
    components: {
        Jumbotron
    },
    data() {
        return {
            topics: null,
            tags: null,
            language: null,
            languageOptions: [
                {label: 'English', id: 1},
                {label: 'French', id: 2},
                {label: 'Spanish', id: 3}
            ],
            topicOptions: [
                {label: 'Biology', id: 4},
                {label: 'Harry Potter', id: 5},
                {label: 'Haikyuu!!', id: 6}
            ],
            tagOptions: [
                {label: 'First Post', id: 1},
                {label: 'Go easy on me!', id: 2},
                {label: 'Constructive criticism', id: 3}
            ],
        }
    },
    methods: {
        createStory() {

        }
    }
}
</script>