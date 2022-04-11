import axios from "axios";

const httpInstance = axios.create({
    timeout: 60000
});

httpInstance.defaults.headers['Access-Control-Allow-Origin'] =  '*';
httpInstance.defaults.headers['origin'] =  '*';

export default httpInstance;