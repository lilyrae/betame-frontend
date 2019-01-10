<template>
    <div class="alert alert-danger" v-show="errorIsVisible">
        <a href="#" class="close" @click="close" aria-label="close">&times;</a>
        <strong>Error!</strong> {{ message }}
    </div>
</template>

<script>
export default {
    name: 'ErrorAlert',
    props: {
        error: Error,
        errorMessage: String
    },
    data() {
        return {
            errorIsVisible: false,
            message: '',
            defaultMessage: 'An unexpected error has occured'
        }
    },
    methods: {
        close() {
            this.errorIsVisible = false;
        },
        toggleErrorDisplay() {
            if(this.message !== '') {
                this.errorIsVisible = true
            } else {
                this.errorIsVisible = false
            }
        }
    },
    watch: {
        error(error) {
            if (!error) {
                this.message = ''
            } else if(error.response !== undefined
                && error.response.data !== undefined
                && error.response.data.error!== undefined
            ) {
                this.message = error.response.data.error;
            } else {
                this.message = this.defaultMessage
            }

            this.toggleErrorDisplay()
        },
        errorMessage(errorMessage) {
            this.message = errorMessage
            this.toggleErrorDisplay()
        }
    }
}
</script>
