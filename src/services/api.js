import axios from "axios";
import { CONSTANT } from "../utils/constant";
const aoxisApi = axios.create();
export const statusCheck = {
    validateStatus: (status) => {
        if (status === 401) {
            // remove token on unauthorized
        } else if (status === 500) {

        }
    }
}

export function onSuccess({ response }) {
    return response;
}

export function onError(response) {
    return response;
}

export const setToken = (token) => {
    aoxisApi.defaults.headers.common['Authorization'] = token;
}

aoxisApi.defaults.baseURL = CONSTANT.BASEURL;
aoxisApi.defaults.headers.post["Content-Type"] = "multipart/form-data";
aoxisApi.defaults.headers.post["Accept"] = "*/*";
// aoxisApi.defaults.headers.common['Authorization'] = '';

export let api = aoxisApi;