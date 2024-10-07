import axios, {type AxiosResponse} from "axios";
import Cookies from "js-cookie";
import {config} from "@/config";

import {
    handleChangeRequestHeader,
    handleConfigureAuth,
    handleGeneralError,
    handleNetworkError,
} from "./tool";
import type {FcResponse} from "./type";
import {ElMessage} from "element-plus";

const isJSON = <T>(str: string) => {
    try {
        const json = JSON.parse(str) as T;
        return json;
    } catch (e) {
        return false;
    }
};

// axios.defaults.baseURL = "http://localhost:8001/api/";
axios.defaults.baseURL = config.httpBaseUrl;
axios.defaults.timeout = config.timeout;

axios.interceptors.request.use((config) => {
    config = handleChangeRequestHeader(config, {
        "Content-Type": "application/json",
    });
    config = handleConfigureAuth(config);
    return config;
});

axios.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status !== 200) {
            return Promise.reject(response.data);
        }
        // handleAuthError(response.data.code);
        handleGeneralError(response.data.retCode, response.data.retMsg);
        return response;
    },
    (err) => {
        handleNetworkError(err.response.status);
        Promise.reject(err.response);
    }
);

const Get = <T>(
    url: string,
    params: any = {}
): Promise<[any, FcResponse<T> | undefined]> =>
    new Promise((resolve) => {
        axios
            .get<FcResponse<T>>(url, {params})
            .then((result) => {
                const data = {
                    ...result.data,
                    resultValue:
                        isJSON<T>(result.data.resultValue as string) ||
                        result.data.resultValue,
                };
                resolve([null, data]);
            })
            .catch((err) => {
                resolve([err, undefined]);
            });
    });

const Post = <T>(
    url: string,
    data: any,
    params: any = {}
): Promise<[any, FcResponse<T> | undefined]> => {
    return new Promise((resolve) => {
        axios
            .post<FcResponse<T>>(url, data, {params})
            .then((result) => {
                const data = {
                    ...result.data,
                    resultValue:
                        isJSON<T>(result.data.resultValue as string) ||
                        result.data.resultValue,
                };
                resolve([null, data]);
            })
            .catch((err) => {
                resolve([err, undefined]);
            });
    });
};

const axiosRequest = {
    Get,
    Post,
};

export default axiosRequest;
