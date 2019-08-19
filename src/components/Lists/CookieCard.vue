<template>
    <div class="card" :class="{ 'colour-flash': flashColour, 'colour-flash-back': flashBack }" :id="divId">
        <div class="card-body row text-left">
            <div class="col-3">
                <p class="beta-title">
                    <font-awesome-icon class="golden" icon="cookie" />
                    {{ cookie.from_user.username }}
                </p>
            </div>
            <div class="col-9">
                <LineBreakText v-if="cookie.message" :text="cookie.message" />
                <router-link v-if="storyLink" :to="storyLink" class="beta-title text-right beta-link">
                    <span class="font14">Revisit their story, {{ cookie.story_title | fullStop }}</span>
                </router-link>
                <p v-else class="font14 grey">They have hidden their story.</p>
            </div>
        </div>
    </div>
</template>

<script>
import LineBreakText from '../LineBreakText.vue'

export default {
    name: 'CookieCard',
    components: {
        LineBreakText
    },
    props: {
        cookie: Object
    },
    data() {
        return {
            flashColour: false,
            flashBack: false
        }
    },
    created() {
        this.highlightRouteComment()
    },
    methods: {
        highlightRouteComment() {
            setTimeout(() => {
                this.flashColour = this.cookie.karma_id == this.$route.query.karma_id
                if (this.flashColour) {
                    this.$scrollTo(`#${this.divId}`, 800, {easing: 'ease', offset: -200})
                }
            }, 200)

            setTimeout(() => {
                if (this.flashColour) {
                    this.flashBack = true
                }
                this.flashColour = false
            }, 1200)  
        }
    },
    computed: {
        divId() {
            return `karma_${this.cookie.karma_id}`
        },
        storyLink() {
            if (this.cookie.story_id) {
                return `/story/${this.cookie.story_id}`
            }
            return null
        }
    }
}
</script>

<style scoped>
.colour-flash {
    background-color: #fbefcc;
    -webkit-transition: background-color 500ms ease;
    -ms-transition: background-color 500ms ease;
    transition: background-color 500ms ease;
}

.colour-flash-back {
    background-color: #ffffff7d;
    -webkit-transition: background-color 500ms ease;
    -ms-transition: background-color 500ms ease;
    transition: background-color 500ms ease;
}
</style>
