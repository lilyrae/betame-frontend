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
        //localStorage.setItem('bm_user', '');
        localStorage.setItem('bm_username', '');
        localStorage.setItem('bm_password', '');

        Event.$emit('loggedOut');
    },
    isLoggedIn() {
        return localStorage.getItem('bm_username') != '';
    },
    setUserPassword(username, password) {
        //localStorage.setItem('bm_user', user);
        localStorage.setItem('bm_username', username);
        localStorage.setItem('bm_password', password);
    }
}