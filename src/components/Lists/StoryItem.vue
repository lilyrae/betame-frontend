<template>
    <div class="beta-text" :class="{'pt-0' : minimise, 'pb-0' : minimise}">
        <div class="row">
            <div class="bullet-point-col">
                <font-awesome-icon @click="minimise = !minimise" :icon="icon" class="betame-red font16 clickable"/>
            </div>
            <div class="content-col bg-light">
                <div class="beta-card" >
                    <h4 class="hide-overflow row story-title">
                        <span class="col">
                            <router-link :to="storyLink" class="beta-title beta-link" @click.native="selectStory">{{ story.title }}</router-link>
                            <router-link :to="userLink" class="author font18 grey beta-link">by {{ story.user.username }}</router-link>
                        </span>
                        <span v-show="!minimise" class="beta-title font16 col-md-3 story-date">{{ story.created_at | formatDate }}</span>
                    </h4>     
                    <p v-show="!minimise" class="hide-overflow font18">
                        {{ story.notes }}</p>
                    <p v-show="!minimise" class="small-bottom-margin font20">
                        <TagList @clickedTag="searchTag" :tags="story.tags"/>
                    </p>
                </div>
                <div class="card-footer row shadow-sm bg-white" v-show="!minimise">
                    <div class="col-lg beta-card-bottom beta-title" :class="{ 'text-left': extraContent }">
                        <span>{{ rating.shortLabel }} </span>
                        <div class="betame-tooltip"><font-awesome-icon icon="info-circle" class="text-grey" />
                            <span class="betame-tooltiptext">
                                This work has the following rating: {{ rating.label }}
                            </span>
                        </div>
                        <span class="divider">|</span><span>{{ story.word_count }} words</span>
                        <span class="divider">|</span><router-link :to="storyLink" class="beta-title beta-link" @click.native="selectStory">{{ story.comment_count }} {{ 'comment' | pluralise(story.comment_count) }}</router-link>
                    </div>
                    <div class="col-lg extra-col" v-if="extraContent"><slot></slot></div>
                </div>
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
        story: {},
        extraContent: {
            type: Boolean,
            default: false
        }
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
    width: 30px;
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

.content-col .card-footer {
    margin-left: 0px;
    margin-right: 0px;
}

.beta-card-bottom {
    text-align: right;
}

.story-title span {
    margin: 3px;
}

.story-date {
    text-align: right;
}

.divider {
    padding-left: 15px;
    padding-right: 15px;
}

.extra-col {
    max-width: 250px;
    float: right;
}

@media only screen and (max-width: 1000px) {
    .content-col {
        width: 90%;
    }

    .story-date {
        text-align: left;
    }

    .beta-card-bottom {
        text-align: left !important;
    }

    .extra-col {
        margin-top: 20px;
    }
}

@media only screen and (max-width: 500px) {
    .beta-card {
        padding-left: 4px;
        padding-right: 4px;
    }

    .beta-card-bottom {
        padding-left: 4px;
        padding-right: 4px;
    }

    .divider {
        padding-left: 5px;
        padding-right: 5px;
    }

    .extra-col {
        padding-left: 0px;
        padding-right: 0px;
        float: left;
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

.author {
    margin-left: 10px;
}
</style>