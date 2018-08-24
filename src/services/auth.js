import axios from 'axios';

export default {
    login(username, password) {
        return axios(
            {
                method: 'get',
                url: process.env.VUE_APP_API + "/login",
                withCredentials: true,
                auth: {username, password}
            });
    },
    logout() {
        localStorage.setItem('bm_username', null);
        localStorage.setItem('bm_password', null);
    },
    isLoggedIn() {
        return localStorage.getItem('bm_username') != null;
    },
    setUserPassword(username, password)
    {
        localStorage.setItem('bm_username', username);
        localStorage.setItem('bm_password', password);
    }
}