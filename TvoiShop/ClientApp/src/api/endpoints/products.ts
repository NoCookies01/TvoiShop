import { get } from "../axios";
import { API, GET_ALL, PRODUCTS } from "../constants";

export function GetAll() {
    return get<IProduct[]>(`${API}/${PRODUCTS}/${GET_ALL}`);
}