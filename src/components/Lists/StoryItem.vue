<template>
    <div class="beta-text" :class="{'pt-0' : minimise, 'pb-0' : minimise}">
        <div class="row">
            <div class="bullet-point-col">
                <font-awesome-icon @click="minimise = !minimise" :icon="icon" class="betame-red font16 clickable"/>
            </div>
            <div class="content-col bg-light">
                <div class="beta-card" >
                    <h4 class="story-title">
                        <router-link :to="storyLink" class="beta-title beta-link" @click.native="selectStory">{{ story.title }}</router-link>
                    </h4>                
                    <p v-show="!minimise" class="hide-overflow font18">
                        {{ story.notes }}</p>
                    <p v-show="!minimise" class="small-bottom-margin font18">
                        <TagList @clickedTag="searchTag" :tags="story.tags"/>
                    </p>
                </div>
                <div v-show="!minimise" class="card-footer beta-card-bottom beta-title shadow-sm">
                    <router-link :to="userLink" class="beta-link">by {{ story.user.username }}</router-link>
                    &nbsp;|&nbsp;<span>{{ story.created_at | formatDate }}</span>
                    &nbsp;|&nbsp;<span>{{ story.word_count }} words</span>
                    &nbsp;|&nbsp;<span>{{ story.comment_count }} {{ 'comment' | pluralise(story.comment_count) }}</span>
                    &nbsp;|&nbsp;<span>{{ rating.shortLabel }} </span>
                    <div class="betame-tooltip"><font-awesome-icon icon="info-circle" class="text-grey" />
                        <span class="betame-tooltiptext">
                            This work has the following rating: {{ rating.label }}
                        </span>
                    </div>
                </div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import TagList from './TagList.vue'
import ratingService from '../../services/rating'
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
        },
        icon() {
            return this.story.is_private ? 'lock' : 'pen-nib'
        },
        rating() {
            return ratingService.get(this.story.rating)
        }
    }
}
</script>

<style scoped>
.bullet-point-col {
    width: 3%;
    padding: 7px;
    margin: 15px 0 10px 0;
}

.content-col {
    width: 95%;
    margin: 15px 0;
}

.beta-card {
    padding: 10px 20px 5px 20px;
}

.beta-card-bottom {
    text-align: right !important;
    background-color: white;
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

    .beta-card-bottom {
        text-align: left !important;
    }
}

.small-bottom-margin {
    margin-bottom: 8px;
}

.clickable {
    cursor: pointer;
}

.beta-card-bottom .fa-info-circle path {
  color: grey;
}
</style>