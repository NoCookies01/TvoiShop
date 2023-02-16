import { post } from "../axios";
import { API, ORDER, PROCEED_ORDER } from "../constants";

export function ProceedOrder(order: IOrder) {
    return post(`${API}/${ORDER}/${PROCEED_ORDER}`, order);
}