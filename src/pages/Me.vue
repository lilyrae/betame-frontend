<template>
  <Default>
    <AccountNavBar/>
    <!-- list of my stories -->
    <ul class="list-group list-group-flush">
      <StoryItem v-for="story in stories" v-bind:key="story.id" v-bind:story="story">
        <p class="float-right">
          <!-- <button class="btn btn-outline-info small-margin">Edit</button> -->
          <button class="btn btn-outline-danger ">Delete</button>
        </p>
      </StoryItem>
    </ul>
  </Default>
</template>

<script>
import Default from '../templates/Default.vue'
import AccountNavBar from '../components/AccountNavBar.vue'
import StoryItem from '../components/StoryItem.vue'
import story from '../services/story.js'

export default {
  name: 'Me',
  components: {
      Default,
      AccountNavBar,
      StoryItem
  },
  data() {
      return {
          stories: [],
          user: {}
      }
  },
  created() {
      this.user = localStorage.getItem('bm_user');
      this.getStories();
  },
  methods: {
    getStories() {
        story.withUserID(this.user.user_id).then(response => {
            this.stories = response.data;
        });
    }
  }
}
</script>

<style scoped>
.small-margin {
  margin-right: 5px;
}
</style>
