import axios from 'axios'

let config = {
    baseURL: process.env.VUE_APP_API
}

// add credentials if logged in
if (localStorage.getItem('bm_password') != '') {
    config.withCredentials = true;
    config.auth = {
        username: localStorage.getItem('bm_email'),
        password: localStorage.getItem('bm_password')
    }
}

export default axios.create(config);
