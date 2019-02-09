<template>
    <div class="card">
        <div class="card-body row text-left">
            <div class="col-3">
                <h5 class="beta-title">
                    <font-awesome-icon class="golden" icon="cookie" />
                    {{ cookie.from_user.username }}
                </h5>
            </div>
            <div class="col-9">
                <LineBreakText v-if="cookie.message" :text="cookie.message" />
                <router-link :to="storyLink" class="beta-title text-right beta-link">
                    Revisit their story...
                </router-link>
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
    computed: {
        storyLink() {
            return '/story/' + this.cookie.story_id
        }
    }
}
</script>