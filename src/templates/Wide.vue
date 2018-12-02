
<template>
  <div class="container-fluid">
    <TopNavBar/>
    <slot></slot>
  </div>
</template>

<script>
import TopNavBar from '../components/TopNavBar.vue'

export default {
  name: 'Full',
  components: {
      TopNavBar
  }
}
</script>