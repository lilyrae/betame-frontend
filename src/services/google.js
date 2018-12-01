import axios from 'axios'

export default {
    isGoogleDocsLink(url) {
        return url.startsWith("https://docs.google.com/document/d/"); 
    },
    docHeaders(url) {
        return axios.head(url);
    }
}
