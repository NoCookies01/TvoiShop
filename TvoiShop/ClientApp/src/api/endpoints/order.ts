import { post } from "../axios";
import { API, ORDER } from "../constants";

export function ProceedOrder(order: IOrder) {
    return post(`${API}/${ORDER}`, order);
}