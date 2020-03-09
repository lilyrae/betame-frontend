<template>
    <BaseNavBar class="big-margin">
        <button @click="getPrevious" class="btn btn-outline-info" type="button" :disabled="!hasPrevious">Previous</button>
        <span class="navbar-text">
            <button @click="getNext" class="btn btn-outline-info" type="button" :disabled="!hasNext">Next</button>
        </span>
    </BaseNavBar>
</template>

<script>
import BaseNavBar from './BaseNavBar'

export default {
    name: 'PaginationNavBar',
    components: {
        BaseNavBar
    },
    props: {
        hasNext: Boolean,
        hasPrevious: Boolean,
        page: Number
    },
    methods: {
        getNext() {
            this.$emit('changePage', this.page + 1)
        },
        getPrevious() {
            this.$emit('changePage', this.page - 1)
        }
    }
}
</script>