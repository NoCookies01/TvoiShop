import axios from 'axios';
import { GetBearer } from './login/bearer';

function getConfig() {
    var headers: {[i: string] : string} = {};

    var bearer = GetBearer();
    if (bearer) {
        headers.Authorization = "Bearer " + bearer;
    }

    return {
        headers: headers
    };
}

export function get<T>(url: string) {
    return axios.get<T>(url, getConfig());
}

export function post<T>(url: string, data: any) {
    return axios.post<T>(url, data, getConfig());
}

export function patch<T>(url: string, data: any) {
    return axios.patch<T>(url, data, getConfig());
}

export function del<T>(url: string) {
    return axios.delete<T>(url, getConfig());
}