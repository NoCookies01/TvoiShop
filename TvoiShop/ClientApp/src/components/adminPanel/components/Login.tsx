import React from "react";
import { Login } from "../../../api/endpoints/auth";
import { AddBearer, GetBearer } from "../../../api/login/bearer";
import toastrService from "../../../services/toastr.service";
import '../AdminPanel.css';
import '../../../styles/shoppingCart.css'
import cookieService from "../../../services/cookie.service";

interface IProps {
    onSuccessfulyLogedin: () => void;
}

export const LogIn = (props: IProps) => {
    const loginRef = React.useRef<HTMLInputElement | null>();
    const passwordRef = React.useRef<HTMLInputElement | null>();
    const onSuccessfulyLogedin = () => props.onSuccessfulyLogedin();
    
    if (GetBearer()) onSuccessfulyLogedin();

    const handleLogin = () => {
        const login = loginRef.current?.value;
        const password = passwordRef.current?.value;

        if (login && password) {
            Login(login, password)
            .then(r => {
                if (!r.data.result.succeeded) throw new Error("Credentials fail");
                AddBearer(r.data.token.token);
                toastrService.callToastr("Succesfully LoggedIn");
                onSuccessfulyLogedin();
            })
            .catch(e => {
                toastrService.callToastr("Error on login", "error");
                console.error(e);
            });
        }
    }

    return(
        <div className="loginPanelPos">
            <div className="loginPanelStyle">
                <input placeholder="Enter your Login" ref={r => loginRef.current = r } className="inputLoginStyle" />
                <input type="password" placeholder="Enter your Password" ref={r => passwordRef.current = r } className="inputLoginStyle" />
                <button onClick={handleLogin} className="btnConfirmLoginStyle">Login</button>
            </div>
        </div>
    );
}

