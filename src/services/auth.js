import axios from 'axios';

export default {
    login(username, password) {
        return axios({
            method: 'get',
            url: process.env.VUE_APP_API + "/login",
            withCredentials: true,
            auth: {username, password}
        });
    },
    logout() {
        localStorage.setItem('bm_user', '');
        localStorage.setItem('bm_email', '');
        localStorage.setItem('bm_password', '');

        Event.$emit('loggedOut');
    },
    isLoggedIn() {
        return localStorage.getItem('bm_password') != '';
    },
    setUserPassword(user, email, password) {
        localStorage.setItem('bm_user', user);
        localStorage.setItem('bm_email', email);
        localStorage.setItem('bm_password', password);
    }
}