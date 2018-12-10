<template>
  <Jumbotron class="text-left">
    <div slot="title">
        <span v-if="isLoadingPage">
            <center>..Loading..</center>
        </span>
        <span v-else>
            <span class="hide-overflow">{{ story.title }}</span>
            <span class="font18 beta-text"> by {{ story.user.username }}</span>
            <span class="font14 float-right">{{ story.created_at | formatDate }}</span>
        </span>
    </div>
    <div slot="subtitle">
        <span v-if="!isLoadingPage">
            <h5 class="hide-overflow"><a class="text-info beta-link" :href="story.url" target="_blank">{{ story.url }}</a></h5>
        </span>
        <hr>
    </div>
    <div>
        <div v-if="isLoadingPage">
            <center><div class="lds-circle"><div></div></div></center>
        </div>
        <div v-else>
            <p class="hide-overflow">{{ story.notes }}</p>
            <p>
                <TagList :tags="story.tags"/>
            </p>
            <p><i>{{ story.word_count }} words</i></p>
        </div>
    </div>
  </Jumbotron>
</template>

<script>
import Jumbotron from '../templates/Jumbotron.vue'
import TagList from '../components/TagList.vue'
import story from '../services/story.js'
import moment from 'moment'

export default {
    name: 'Story',
    components: {
        Jumbotron,
        TagList
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
            }).catch(() => {
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
