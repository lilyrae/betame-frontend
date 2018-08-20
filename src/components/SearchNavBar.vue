<template>
    <div>
        <nav class="navbar navbar-light bg-light big-margin beta-innerbar">
            <!-- Temporary Frontend Search  -->
            <form class="form-inline col-sm-8">
                <div class="col-sm-10">
                    <input :v-model="search" class="beta-search form-control my-6" type="text" placeholder="Search" aria-label="Search">
                </div>
                <button class="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
            </form>
            <span class="navbar-text">
                <button class="btn btn-danger" @click="showModal = true">
                New <i class="fas fa-pen-fancy"></i>
                </button>
            </span>
        </nav>
        <CreateStoryModal :showModal.sync="showModal"></CreateStoryModal>
    </div>
</template>

<script>
import CreateStoryModal from './CreateStoryModal.vue'

export default {
    name: 'SearchNavBar',
    components: {
        CreateStoryModal
    },
    data() {
        return {
            showModal: false,
            search: ""
        }
    }
}
</script>

<style scoped>
.beta-search {
    width: 100%;
}
</style>