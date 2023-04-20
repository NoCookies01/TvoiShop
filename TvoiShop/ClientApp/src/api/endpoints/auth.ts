import { post } from "../axios";
import { API, AUTH, LOGIN } from "../constants";

export function Login(login: string, password: string) {
    return post<{token: IUserTokens, result: {succeeded: boolean}}>(`${API}/${AUTH}/${LOGIN}`, {Name: login, Password: password});
}