<template>
  <div class="container">
    <TopNavBar/>
    <br>
    <slot></slot>
    <BottomNavBar />
  </div>
</template>

<script>
import TopNavBar from '../components/NavBars/TopNavBar.vue'
import BottomNavBar from '../components/NavBars/BottomNavBar.vue'

export default {
  name: 'Default',
  components: {
      TopNavBar,
      BottomNavBar
  }
}
</script>