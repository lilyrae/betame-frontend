<template>
    <div>
        <nav class="navbar navbar-light bg-light big-margin beta-search-bar">
            <form class="form-inline">
                <input class="form-control mr-sm-4 my-6" type="search" placeholder="Search" aria-label="Search">
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
            showModal: false
        }
    }
}
</script>
