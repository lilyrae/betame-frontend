<template>
  <Default>
    <div class="text-left">
      <slot></slot>
    </div>
  </Default>
</template>

<script>
import Default from './Default.vue'

export default {
  name: 'Blog',
  components: {
      Default
  }
}
</script>