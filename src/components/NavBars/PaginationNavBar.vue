<template>
    <BaseNavBar class="big-margin">
        <template v-if="hasNext || hasPrevious">
            <button @click="getPrevious" class="btn btn-info" type="button" :disabled="!hasPrevious"><font-awesome-icon icon="chevron-left" /></button>
            <span class="navbar-text beta-title">
                <p class="page-number">page {{ this.page }}</p>
            </span>
            <span class="navbar-text">
                <button @click="getNext" class="btn btn-info" type="button" :disabled="!hasNext"><font-awesome-icon icon="chevron-right" /></button>
            </span>
        </template>
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

<style scoped>
.page-number {
    margin-top: 10px;
}
</style>