<template>
    <Wide>
        <div class="row top-row h-100">
            <div class="col-md-3 panel">
                <div class="user-panel text-left hide-overflow">
                    <h3 class="beta-title account-title">
                        Admin
                    </h3>
                    <hr class="title-hr">
                    <router-link class="btn betame-light-button beta-link link" to="/admin/users">Users</router-link>
                </div>
            </div>
            <div class="col-md-8">
                <slot></slot>
            </div>
        </div>
    </Wide>
</template>

<script>
import Wide from '../layouts/Wide.vue'

export default {
    name: 'Admin',
    components: {
        Wide
    }
}
</script>

<style scoped>
body {
    height: 100%;
}
.small-margin {
  margin-right: 5px;
}

.top-row {
    margin-top: -10px;
}

.panel {
    background-color: #bfdde2!important;
}

@media (min-width: 768px) {
    .panel {
        min-height: 93.5vh;
    }
}

.user-panel {
    margin: 20px;
    margin-top: 40px;
    padding: 20px;
}

.number-link {
    text-decoration: none;
}

.account-title {
    text-overflow: ellipsis;
    -webkit-text-stroke: 1px black;
    color: white;
    text-shadow:
        2px 2px 0 #312e2b,
        -1px -1px 0 #312e2b,  
        1px -1px 0 #312e2b,
        -1px 1px 0 #312e2b,
        1px 1px 0 #312e2b;
    overflow: hidden;
}

.sub-title {
    text-overflow: ellipsis;
    -webkit-text-stroke: 0.25px black;
    color: white;
    text-shadow:
        0.5px 0.5px 0 #312e2b,
        -0.25px -0.25px 0 #312e2b,  
        0.25px -0.25px 0 #312e2b,
        -0.25px 0.25px 0 #312e2b,
        0.25px 0.25px 0 #312e2b;
    overflow: hidden;
}

.link {
    margin: 4px;
}
</style>
