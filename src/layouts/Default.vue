<template>
  <div class="container">
    <TopNavBar/>
    <br>
    <slot></slot>
  </div>
</template>

<script>
import TopNavBar from '../components/NavBars/TopNavBar.vue'

export default {
  name: 'Default',
  components: {
      TopNavBar
  }
}
</script>