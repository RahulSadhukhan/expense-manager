import axios from 'axios';

class Request {
    get(url, options) {
        return axios.get(url, options);
    }

    post(url, data, options) {
        console.log('--------->', data);
        return axios.post(url, data, options);
    }

    put(url, data, options) {
        return axios.put(url, data, options);
    }

    delete(url, options) {
        return axios.delete(url, options);
    }
}

export default new Request();