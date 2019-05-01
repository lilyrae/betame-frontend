import api from './betame.api'

export default {
    signup(username, email, password, token) {
        return api.post('/register', {username, email, password, token})
    },
    login(email, password) {
        localStorage.setItem('bm_email', email);
        localStorage.setItem('bm_password', password);

        return api.get('/login')
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
    changePassword(newPassword) {
        return api.post("/account/password", {newPassword})
    },
    userId() {
        return localStorage.getItem('bm_user_id');
    },
    username() {
        return localStorage.getItem('bm_username');
    }
}