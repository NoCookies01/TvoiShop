import React from "react";

interface IProps {
    message: string;
    type: string;
}


export const Toastr = ({message, type}: IProps) => {
    return(
        <div className={`toastrStyle--${type}`}>{message}</div>
    )
}