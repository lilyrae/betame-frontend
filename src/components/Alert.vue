<template>
    <div class="alert alert-success" v-show="show">
        <strong>Success!</strong> {{ message }}
    </div>
</template>

<script>
export default {
    name: 'Alert',
    props: {
        message: String
    },
    computed: {
        show() {
            return this.message !== '' && this.message !== undefined;
        }
    }
}
</script>
