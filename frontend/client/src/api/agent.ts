import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
// import { history } from "../App"; 

declare global {
    interface Window { 
        _env_: any; 
    }
}

axios.defaults.baseURL = `${window._env_.REACT_APP_BACKEND_URL}/api`;

axios.interceptors.response.use(undefined, (error: any) => {
    if(error.response.status === 400) {
        return Promise.reject(error.response.data);
    } else {
        toast.error(`${error.message} for URL ${error.config.baseURL}${error.config.url}`);
    }

    if(error.response && error.response.data) {
        return Promise.reject(error.response.data);
    } else {
        return Promise.reject(error.message + "\n" + error.stack);
    }
});

const responseBody = async (response: AxiosResponse) =>( await response.data );

const requests = {
    get: async (url: string) =>
        await axios
            .get(url)
            .then(responseBody)
            .catch((e: any) => {
                console.log(e);
            }),
    post: async (url: string, body: {}) =>
        await axios
            .post(url, body)
            .then(responseBody, (value: AxiosResponse) => {
                if (value.data)
                    return value.data;
                else
                    return value;
            })
            .catch((e: any) => {
                console.log(e);
            }),
    put: async (url: string, body: {}) =>
        await axios
            .put(url, body)
            .then(responseBody)
            .catch((e: any) => {
                console.log(e);
            }),
    del: async (url: string) => 
        await axios
            .delete(url)
            .then((value: AxiosResponse) => {
                if (value.data)
                    return value.data;
                else
                    return value.status;
            })
            .catch((e: any) => {
                console.log(e);
            })
};

const Test = {}

export default { Test };
