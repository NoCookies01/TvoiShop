import { clearPropertiesFromObjectDeep } from "../../services/object.service";
import { del, get, patch, post } from "../axios";
import { ADD_PRODUCT, API, DELETE_BY_ID, GET_ALL, PATCH_PRODUCT, PRODUCTS } from "../constants";

export function GetAll() {
    return get<IProduct[]>(`${API}/${PRODUCTS}/${GET_ALL}`);
}

export function DeleteById(uuid: string) {
    return del(`${API}/${PRODUCTS}/${DELETE_BY_ID}?id=${uuid}`);
}

export function PostProduct(product: IProduct) {
    return patch(`${API}/${PRODUCTS}/${PATCH_PRODUCT}`, product);
}

export function PatchProduct(product: IProduct) {
    clearPropertiesFromObjectDeep(product, ["id"]);
    return patch(`${API}/${PRODUCTS}/${ADD_PRODUCT}`, product);
}