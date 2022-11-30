import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { message } from 'ant-design-vue';

export const defaultOptions = {
    headers: {
        'Content-Type': 'application/json'
    }
};

// const controller = new AbortController();
// 生成请求key
const getRequestKey = (config: AxiosRequestConfig) => {
    const { method, url, params, data } = config;
    return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&');
};

// 添加请求Key到pendingRequest中
const pendingRequest = new Map();
const addPendingRequest = (config: AxiosRequestConfig) => {
    const requestKey = getRequestKey(config);
    const controller = new AbortController();
    config.signal = config.signal || controller.signal;
    if (!pendingRequest.has(requestKey)) {
        pendingRequest.set(requestKey, controller);
    }
};

// 取消重复请求
const removePendingRequest = (config: AxiosRequestConfig) => {
    const requestKey = getRequestKey(config);
    if (pendingRequest.has(requestKey)) {
        const ctrl = pendingRequest.get(requestKey);
        ctrl.abort();
        pendingRequest.delete(requestKey);
    }
};

export const requestSuccessFunc = (config: AxiosRequestConfig) => {
    console.log('requestSuccess before',config)
    removePendingRequest(config);
    console.log('requestSuccess after',config)
    addPendingRequest(config);
    return config;
};

export const requestFailFunc = (error: AxiosError) => {
    Promise.reject(error);
};

const SUCCESS_CODE = 0;
const MESSAGE = 'msg';

export const responseSuccessFunc = (response: AxiosResponse) => {
    removePendingRequest(response.config);
    const { data } = response;
    if (data.error === SUCCESS_CODE) {
        return data;
    } else {
        message.error(data[MESSAGE]);
        return Promise.reject(data[MESSAGE]);
    }
};

export const responseFailFunc = (error: AxiosError) => {
    removePendingRequest(error.config);
    Promise.reject(error);
};
