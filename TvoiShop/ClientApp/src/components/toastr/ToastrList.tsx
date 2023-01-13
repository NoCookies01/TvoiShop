import React, { useEffect, useState } from "react";
import toastrService from "../../services/toastr.service";
import {Toastr} from "./Toastr";

interface IToastr {
    message: string;
    type: string;
}

export function ToastrList(){
    const [toastrs, setToastrs] = useState<IToastr[]>([]);
    
    const sliceToastr = () => {
        setToastrs(toastrs.slice(1));
    }

    const push = (message: string, type: string) => {
        const newToastrs = [...toastrs, {message, type}];

        setToastrs(newToastrs);
    }

    const addToastr = (message: string, type: string = "Info") => {
        push(message, type);
        setTimeout(() => {
            sliceToastr();
        }, 750);
    }

    useEffect(() => {
        toastrService.subscribe(addToastr);
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