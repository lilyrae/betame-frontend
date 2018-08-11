<template>
    <div>
        <div v-if="showModal">
        <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">

            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title beta-text">Create New Post</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" @click="showModal = false">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body beta-text">
                    <form>
                    <div class="form-group row">
                        <label for="title" class="col-sm-2 col-form-label">Title</label>
                        <div class="col-sm-9">
                        <input type="title" class="form-control" placeholder="Brave New World">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="intent" class="col-sm-2 col-form-label">Intent</label>
                        <div class="col-sm-9">
                        <textarea type="intent" class="form-control" placeholder="I want to tell a story about.."></textarea>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="url" class="col-sm-2 col-form-label">Link</label>
                        <div class="col-sm-9">
                        <input type="url" class="form-control" aria-describedby="urlHelpBlock" placeholder="https://docs.google.com/document/d/1umopb9lKxII6bwK2GDS0BN1xJg2O4MHrw-dBJTeEqn4/edit?usp=sharing">
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
                </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" @click="showModal = false">Close</button>
                        <button type="button" class="btn btn-info">Create</button>
                    </div>
                </div>
            </div>

            </div>
        </div>
        </transition>
    </div>
    </div>
</template>

<script>
export default {
    name: 'CreateStoryModal',
    props: {
        showModal: Boolean
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
    }
}
</script>