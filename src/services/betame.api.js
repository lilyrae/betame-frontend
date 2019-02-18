import axios from 'axios'
const qs = require('qs');

export default {
    createApiHandler() {
        let config = {
            baseURL: process.env.VUE_APP_API
        }

        if (localStorage.getItem('bm_password') != '') {
            config.withCredentials = true;
            config.auth = {
                username: localStorage.getItem('bm_email'),
                password: localStorage.getItem('bm_password')
            }
        }
        
        let api = axios.create(config);
        
        api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        // global response handler
        api.interceptors.response.use((response) => {
            return response
        }, (error) => {
            // get error message
            let message = ''

            if(error.response !== undefined
                && error.response.data !== undefined
                && error.response.data.error!== undefined
            ) {
                message = error.response.data.error;
            }

            return Promise.reject(message)
        })

        return api;
    },
    get(url, parameters) {
        if(parameters) {
            let queryString = Object.keys(parameters).map(function(key) {
                return key + '=' + parameters[key]
            }).join('&');
            
            url += "?" + queryString
        }
        return this.createApiHandler().get(url)
    },
    post(url, parameters) {
        return this.createApiHandler().post(url, qs.stringify(parameters), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    delete(url) {
        return this.createApiHandler().delete(url)
    }
}