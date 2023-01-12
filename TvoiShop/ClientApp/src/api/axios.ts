import axios from 'axios';
import localstorageService from '../services/localstorage.service';

function getConfig() {
    var headers: {[i: string] : string} = {};

    var bearer = localstorageService.getItem("Bearer");
    if (bearer) {
        headers.Authorization = "Bearer " + localstorageService.getObject("Bearer");
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