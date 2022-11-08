import { get } from "../axios";
import { API, PRODUCTS } from "../constants";

export function GetAll() {
    return get<IProduct[]>(`${API}/${PRODUCTS}`)
}