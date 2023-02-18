import React, { useEffect, useState } from "react";
import toastrService from "../../services/toastr.service";
import {Toastr} from "./Toastr";

interface IToastr {
    message: string;
    type: string;
}

export function ToastrList() {
    const [toastrs, setToastrs] = useState<IToastr[]>([]);

    const sliceToastr = () => {
        setToastrs(toastrs.slice(1));
    }

    const push = (message: string, type: string) => {
        const newToastrs = [...toastrs, {message, type}];

        setToastrs(newToastrs);
    }

    const addToastr = (message: string, type: string = "info") => {
        push(message, type);
        setTimeout(() => {
            sliceToastr();
        }, 1150);
    }

    useEffect(() => {
        toastrService.subscribe((message: string, type: string = "info") => addToastr(message, type));
    }, []);

    return(
        <div>{toastrs.reverse().map((t, i) => 
            <Toastr
                key={i}
                message={t.message} 
                type={t.type} 
            />
        )}</div>
    )
}