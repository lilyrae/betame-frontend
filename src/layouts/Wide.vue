
<template>
  <div class="container-fluid h-100">
    <TopNavBar/>
    <slot></slot>
    <BottomNavBar />
  </div>
</template>

<script>
import TopNavBar from '../components/NavBars/TopNavBar.vue'
import BottomNavBar from '../components/NavBars/BottomNavBar.vue'

export default {
  name: 'Wide',
  components: {
      TopNavBar,
      BottomNavBar
  }
}
</script>