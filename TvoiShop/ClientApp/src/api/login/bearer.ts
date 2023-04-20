import cookieService from "../../services/cookie.service";
import jwtDecode from 'jwt-decode';

const key = "Bearer";

interface IJWTData {
    exp: number;
    nbf: number;
}

export const AddBearer = (bearer: string) => {
    var bearerData = jwtDecode<IJWTData>(bearer);

    cookieService.setCookie(key, bearer, bearerData.exp * 1000);
}

export const GetBearer = () => {
    return cookieService.getCookie(key);
}