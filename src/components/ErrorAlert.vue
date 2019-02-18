<template>
    <div class="alert alert-danger" v-show="show">
        <strong>Error!</strong> {{ error }}
    </div>
</template>

<script>
export default {
    name: 'ErrorAlert',
    props: {
        error: String
    },
    computed: {
        show() {
            return this.error != null && this.error != ''
        }
    }
}
</script>
