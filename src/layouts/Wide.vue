
<template>
  <div class="container-fluid h-100">
    <TopNavBar/>
    <slot></slot>
  </div>
</template>

<script>
import TopNavBar from '../components/NavBars/TopNavBar.vue'

export default {
  name: 'Full',
  components: {
      TopNavBar
  }
}
</script>