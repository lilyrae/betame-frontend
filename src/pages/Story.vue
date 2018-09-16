<template>
  <Jumbotron class="text-left">
    <div slot="title">
        {{ story.title }}
        <span class="font18 beta-text"> by {{ story.user.username }}</span>
        <span class="font14 float-right">{{ story.created_at | formatDate }}</span>
    </div>
    <div slot="subtitle">
        <h5><a class="text-info" :href="story.url">{{ story.url }}</a></h5>
        <hr>
    </div>
    <div>
        <p>{{ story.notes }}</p>
        <p 
        v-for="tag in story.tags"
        v-bind:key="tag.tag_id"
        v-bind:class="{
            'beta-grey-badge': tag.tag_type_id == 1,
            'beta-blue-badge': tag.tag_type_id == 2,
            'beta-dark-blue-badge': tag.tag_type_id == 3,
            'badge-info': tag.tag_type_id == 4
        }"
        class="badge small-margin">
            {{ tag.text }}
        </p>
        <p><i>{{ story.word_count }} words</i></p>
    </div>
  </Jumbotron>
</template>

<script>
import Jumbotron from '../templates/Jumbotron.vue'
import story from '../services/story.js'
import moment from 'moment'

export default {
    name: 'Story',
    components: {
        Jumbotron
    },
    props: {
        id: null
    },
    data() {
        return {
            story: {
                user: {}
            }
        };
    },
    created() {
        story.byId(this.id)
            .then((response) => {
                this.story = response.data;
                document.title = this.story.title + ' - Beta me.';
            })
    },
    filters: {
        formatDate(date) {
            return moment(date).format('Do MMMM YYYY');
        }
    }
}
</script>