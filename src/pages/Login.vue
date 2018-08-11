<template>
  <div class="container">
    <TopNavBar/>
    <br>
    <div class="jumbotron">
        <h3 class="beta-title">Login</h3>
        <br>
        <form class="beta-text">
            <div class="form-group row">
                <label for="email" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-6">
                <input type="email" class="form-control">
                </div>
            </div>
            <div class="form-group row">
                <label for="password" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-6">
                <input type="password" class="form-control"/>
                </div>
            </div>
        </form>
    </div>
  </div>
</template>

<script>
import TopNavBar from '../components/TopNavBar.vue'

export default {
  name: 'Login',
  components: {
      TopNavBar
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>

</style>
