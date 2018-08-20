<template>
  <Default>
    <SearchNavBar/>
    <!-- List of Stories -->
    <ul class="list-group list-group-flush">
      <li class="list-group-item beta-text" v-for="story in stories" v-bind:key="story.id">
        <h4><a :href="story.url" target="_blank">{{ story.title }}</a>&nbsp;<span class="font18 grey">by {{ story.user }}</span></h4>
        
        <p>{{ story.intent }}</p>
        <span 
          v-for="tag in story.tags"
          v-bind:key="tag.id"
          v-bind:class="{
            'beta-grey-badge': tag.type == 1,
            'beta-blue-badge': tag.type == 2,
            'beta-dark-blue-badge': tag.type == 3,
            'badge-info': tag.type == 4
          }"
          class="badge small-margin">
            {{ tag.label }}
          </span>
      </li>
    </ul>
    <BottomNavBar />
  </Default>
</template>

<script>
import Default from '../templates/Default.vue'
import SearchNavBar from '../components/SearchNavBar.vue'
import BottomNavBar from '../components/BottomNavBar.vue'

export default {
  name: 'StoryList',
  components: {
      Default,
      SearchNavBar,
      BottomNavBar
  },
  data() {
    return {
      stories: [],
      allStories: []
    }
  },
  created: function () {
    this.getStories()
  },
  methods: {
    getStories() {
      this.$http.get(process.env.VUE_APP_API + "/story").then(response => {
        this.stories = response.data;
        this.allStories = response.data;
      });
    }
  }
}
</script>

<style scoped>
a { color: inherit; }
</style>
