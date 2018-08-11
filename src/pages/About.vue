<template>
  <div class="hello container">
    <TopNavBar/>
    <br>
    <div class="jumbotron">
        <h3 class="beta-title">About</h3>
        <br>
        <div class="beta-text">
            <p>
                yadayadayada yadayadayada
            </p>
        </div>
    </div>
  </div>
</template>

<script>
import TopNavBar from '../components/TopNavBar.vue'

export default {
  name: 'About',
  components: {
      TopNavBar
  },
  data() {
    return {
    }
  }
}
</script>