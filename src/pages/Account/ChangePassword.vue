<template>
    <Account>
        <Jumbotron>
            <span slot="title">Change Your Password</span>
            <br>
            <div class="offset-sm-2 col-sm-8">
                <ErrorAlert :error="error" />
                <Alert :message="successMessage"/>
                <form class="beta-text" v-on:submit.prevent="changePassword">
                    <div class="form-group row">
                        <label for="password" class="col-sm-3 col-form-label">Old Password</label>
                        <div class="col-sm-9">
                        <input type="password" v-model="oldPassword" class="form-control" required>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="password" class="col-sm-3 col-form-label">New Password</label>
                        <div class="col-sm-9">
                        <input type="password" v-model="newPassword" class="form-control" required/>
                        </div>
                    </div>
                    <br>
                    <center>
                        <button
                            class="btn btn-lg btn-info ld-ext-right"
                            :class="{'running': isLoading}"
                            @click="changePassword"
                            >
                            Confirm
                            <div class="ld ld-ring ld-spin"></div>
                        </button>
                    </center>
                </form>
            </div>
        </Jumbotron>
    </Account>
</template>

<script>
import Account from '../../layouts/Account.vue'
import Jumbotron from '../../components/Jumbotron.vue'
import ErrorAlert from '../../components/ErrorAlert.vue'
import auth from '../../services/auth.js'

export default {
    name: 'ChangePassword',
    components: {
        Account,
        Jumbotron,
        ErrorAlert
    },
    data() {
        return {
            oldPassword: '',
            newPassword: '',
            isLoading: false,
            error: '',
            successMessage: ''
        };
    },
    methods: {
        changePassword() {
            if (this.newPassword === this.oldPassword) {
                this.error = "Your new password is the same as your old password."
                return
            }

            this.isLoading = true;

            auth.changePassword(this.oldPassword, this.newPassword)
                .then(() => {
                    this.successMessage = "You have changed your password."
                    auth.setPassword(this.newPassword)
                }).catch(error => {
                    this.error = error || 'Failed to change password'
                })
                .finally(() => {
                    this.isLoading = false;
                });
        }
    }
}
</script>