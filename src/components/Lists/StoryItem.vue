<template>
    <li class="list-group-item beta-text" :class="{'pt-0' : minimise, 'pb-0' : minimise}">
        <div class="row">
            <div class="bullet-point-col">
                <font-awesome-icon @click="minimise = !minimise" icon="pen-nib" class="betame-red font16 clickable"/>
            </div>
            <div class="content-col">
                <h4 class="hide-overflow row story-title">
                    <span class="col">
                        <router-link :to="storyLink" class="beta-title beta-link" @click.native="selectStory">{{ story.title }}</router-link>
                        &nbsp;<router-link :to="userLink" class="font18 grey beta-link">by {{ story.user.username }}</router-link>
                    </span>
                    <span v-show="!minimise" class="beta-title font16 col-md-3">{{ story.created_at | formatDate }}</span>
                </h4>
                <div class="font18" v-show="!minimise">
                    <p class="hide-overflow">{{ story.notes }}</p>
                    <p class="small-bottom-margin">
                        <TagList @clickedTag="searchTag" :tags="story.tags"/>
                    </p>
                    <p class="small-bottom-margin row stats">
                        <span class="col-md-12">{{ story.word_count }} words,&nbsp;{{ story.comment_count }} {{ 'comment' | pluralise(story.comment_count) }}</span>
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
    methods: {
        searchTag({tag}) {
            EventBus.$emit('searchTag', {tag})
        },
        selectStory() {
            this.$store.commit('story/story', this.story)
        }
    },
    computed: {
        storyLink() {
            return `/story/${this.story.story_id}`
        },
        userLink() {
            return `/user/${this.story.user.username}.${this.story.user.user_id}`
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

.stats {
    text-align: center;
}

@media only screen and (max-width: 1000px) {
    .bullet-point-col {
        width: 10%;
    }

    .content-col {
        width: 90%;
    }

    .stats {
        text-align: left;
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