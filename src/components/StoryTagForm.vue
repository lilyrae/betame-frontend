<template>
    <form v-on:submit.prevent="addTags">
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
        <button type="submit" class="btn btn-lg btn-info">Add</button>
    </form>
</template>

<script>
export default {
    name: 'StoryTagForm',
    data() {
        return {
            story_id: null,
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
        addTags() {
            
        }
    },
    mounted() {
        Event.$on('createdStory', story => {
            this.createdStory = true;
            this.story_id = story.story_id;
            console.log(this.story_id);
        });
        console.log(this.story_id);
    }
}
</script>