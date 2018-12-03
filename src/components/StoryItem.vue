<template>
    <li class="list-group-item beta-text">
        <div class="row">
        <div class="bullet-point-col">
            <i class="fas fa-pen-nib betame-red font14"></i>
        </div>
        <div class="content-col">
            <h4>
            <router-link class="beta-title" :to="storyUrl">{{ story.title }}</router-link>&nbsp;
            <span class="font18 grey">by {{ story.user.username }}</span>
            <span class="beta-title font14 float-right">{{ story.created_at | formatDate }}</span>
            </h4>
            <div class="font18">
                <p>{{ story.notes }}</p>
                <p class="small-bottom-margin">
                    <TagList :tags="story.tags"/>
                </p>
                <p class="small-bottom-margin"><i>{{ story.word_count }} words</i></p>
            </div>
            <slot></slot>
        </div>
        </div>
    </li>
</template>

<script>
import moment from 'moment'
import TagList from './TagList.vue'

export default {
    name: 'StoryItem',
    components: {
        TagList
    },
    props: {
        story: {}
    },
    filters: {
        formatDate(date) {
            return moment(date).format('Do MMMM YYYY');
        }
    },
    computed: {
        storyUrl() {
            return "/story/" + this.story.story_id;
        }
    }
}
</script>

<style scoped>
.bullet-point-col {
    width: 3%;
    padding: 7px;
}

.content-col {
    width: 95%;
    padding: 5px;
}

@media only screen and (max-width: 1000px) {
    .bullet-point-col {
        width: 10%;
    }

    .content-col {
        width: 90%;
    }
}

.small-bottom-margin {
    margin-bottom: 8px;
}
</style>