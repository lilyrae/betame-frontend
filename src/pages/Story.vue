<template>
  <Jumbotron class="text-left">
    <div slot="title">
        <span v-if="isLoadingPage">
            <center>..Loading..</center>
        </span>
        <span v-else>
            {{ story.title }}
            <span class="font18 beta-text"> by {{ story.user.username }}</span>
            <span class="font14 float-right">{{ story.created_at | formatDate }}</span>
        </span>
    </div>
    <div slot="subtitle">
        <span v-if="!isLoadingPage">
            <h5><a class="text-info" :href="story.url" target="_blank">{{ story.url }}</a></h5>
        </span>
        <hr>
    </div>
    <div>
        <div v-if="isLoadingPage">
            <center><div class="lds-circle"><div></div></div></center>
        </div>
        <div v-else>
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
            },
            isLoadingPage: false
        };
    },
    created() {
        this.isLoadingPage = true;
        story.byId(this.id)
            .then((response) => {
                this.story = response.data;
                document.title = this.story.title + ' - Beta me.';
            }).catch((error) => {
                this.$router.push('/404')
            }).finally(() => {
                this.isLoadingPage = false;
            });
    },
    filters: {
        formatDate(date) {
            return moment(date).format('Do MMMM YYYY');
        }
    }
}
</script>
