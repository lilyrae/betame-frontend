<template>
    <BaseNavBar class="big-margin">
        <button class="btn btn-outline-info" type="button" disabled>Previous</button>
        <span class="navbar-text">
            <button class="btn btn-outline-info" type="button" disabled>Next</button>
        </span>
    </BaseNavBar>
</template>

<script>
import BaseNavBar from './BaseNavBar'

export default {
    name: 'PaginationNavBar',
    components: {
        BaseNavBar
    }
}
</script>