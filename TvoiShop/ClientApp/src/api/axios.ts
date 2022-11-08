import axios from 'axios';

export function get<T>(url: string) {
    return axios.get<T>(url);
}

export function post<T>(url: string, data: any) {
    return axios.get<T>(url, {
        data
    });
}