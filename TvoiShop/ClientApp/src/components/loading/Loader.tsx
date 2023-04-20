import React from "react";
import Spinner from "./Spinner";

interface IProps {
    children: JSX.Element | JSX.Element[];
    isLoading: boolean;
}

export const Loader = (props: IProps) => { 
    return (
        <>
            {
                props.isLoading ? (
                    <Spinner />
                ) : (
                    props.children
                )
            }
        </>
    );
}