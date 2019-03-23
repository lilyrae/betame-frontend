<template>
    <li class="list-group-item beta-text">
        <div class="row">
        <div class="bullet-point-col">
            <font-awesome-icon @click="minimise = !minimise" icon="pen-nib" class="betame-red font14 clickable"/>
        </div>
        <div class="content-col">
            <h4 class="hide-overflow row story-title">
                <span class="col">
                    <router-link class="beta-title beta-link" :to="storyUrl">{{ story.title }}</router-link>
                    &nbsp;<span class="font18 grey">by {{ story.user.username }}</span>
                </span>
                <span v-show="!minimise" class="beta-title font14 col-md-3">{{ story.created_at | formatDate }}</span>
            </h4>
            <div class="font18" v-show="!minimise">
                <p class="hide-overflow">{{ story.notes }}</p>
                <p class="small-bottom-margin">
                    <TagList @clickedTag="searchTag" :tags="story.tags"/>
                </p>
                <p class="small-bottom-margin row stats">
                    <span class="col"></span>
                    <span class="col-md-3">{{ story.word_count }} words,&nbsp;{{ story.comment_count }} {{ 'comment' | pluralise(story.comment_count) }}</span>
                    <span class="col"></span>
                </p>
            </div>
            <slot></slot>
        </div>
        </div>
    </li>
</template>

<script>
import TagList from './TagList.vue'
import { EventBus } from '../../event-bus.js'

export default {
    name: 'StoryItem',
    components: {
        TagList
    },
    data() {
        return {
            minimise: false
        }
    },
    props: {
        story: {}
    },
    computed: {
        storyUrl() {
            return "/story/" + this.story.story_id;
        }
    },
    methods: {
        searchTag({tag}) {
            EventBus.$emit('searchTag', {tag})
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

.story-title span {
    margin: 3px;
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

.stats {
    font-size: 18px;
}

.clickable {
    cursor: pointer;
}
</style>