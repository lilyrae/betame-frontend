<template>
    <div class="alert alert-danger" v-show="showError">
        <a href="#" class="close" @click="close" aria-label="close">&times;</a>
        <strong>Error!</strong> {{ message }}
    </div>
</template>

<script>
export default {
    name: 'ErrorAlert',
    props: {
        error: Object
    },
    methods: {
        close() {
            this.error = null;
        }
    },
    computed: {
        message() {
            if(this.error &&
                this.error.response !== undefined
                && this.error.response.data !== undefined
                && this.error.response.data.error!== undefined
            ) {
                return this.error.response.data.error;
            }

            if(this.error &&
                this.error.message !== undefined
            ) {
                return this.error.message;
            }
            return "An unexpected error has occured";
        },
        showError() {
            return this.error !== null && this.error !== undefined;
        }
    }
}
</script>
