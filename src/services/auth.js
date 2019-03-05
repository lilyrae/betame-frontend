import axios from 'axios';
var qs = require('qs');

export default {
    signup(username, email, password) {
        return axios({
            method: 'post',
            url: process.env.VUE_APP_API + "/register",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({username, email, password})
        });
    },
    login(username, password) {
        return axios({
            method: 'get',
            url: process.env.VUE_APP_API + "/login",
            withCredentials: true,
            auth: {username, password}
        });
    },
    logout() {
        localStorage.setItem('bm_user_id', '');
        localStorage.setItem('bm_username', '');
        localStorage.setItem('bm_email', '');
        localStorage.setItem('bm_password', '');

        Event.$emit('loggedOut');
    },
    isLoggedIn() {
        return localStorage.getItem('bm_password') && localStorage.getItem('bm_password')  != '';
    },
    setUserPassword(user_id, username, email, password) {
        localStorage.setItem('bm_user_id', user_id);
        localStorage.setItem('bm_username', username);
        localStorage.setItem('bm_email', email);
        localStorage.setItem('bm_password', password);
    },
    setPassword(password) {
        localStorage.setItem('bm_password', password);
    },
    changePassword(oldPassword, newPassword) {
        const username = localStorage.getItem('bm_email')
        return axios({
            method: 'post',
            url: process.env.VUE_APP_API + "/account/password",
            withCredentials: true,
            auth: {username, password: oldPassword},
            data: qs.stringify({newPassword})
        });
    },
    userId() {
        return localStorage.getItem('bm_user_id');
    },
    username() {
        return localStorage.getItem('bm_username');
    }
}