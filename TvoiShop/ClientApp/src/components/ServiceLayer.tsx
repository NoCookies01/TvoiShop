import React from 'react';
import { Navigate, useParams } from 'react-router-dom';


export default function ServiceLayer() {
    let data = useParams<any>();

    console.log(data)

    return null;
}