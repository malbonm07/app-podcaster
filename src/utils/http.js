import axios from "axios";

const httpInstance = axios.create({
    timeout: 60000
});

export default httpInstance;