import React, { DetailedHTMLProps } from 'react'
import './CheckBox.css';


export const Checkbox = (props: DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {

    return (
        <div 
            className={`checkbox clickable checkboxSize ${props.checked ? "checked" : ""}`} 
            onClick={props.onClick}
        >
        </div>
    )
}