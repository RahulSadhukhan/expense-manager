import config from '../config';

class Utils {
    getServerUrl = (path) => {
        return `${config.serverUrl}${path}`;
    }
}

export default new Utils();