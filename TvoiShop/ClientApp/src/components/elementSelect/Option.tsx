import React from "react";
import IOption from "./Item";

interface IProps {
    onSelect: (selected: boolean) => void;
    showCheckbox?: boolean;
    option: IOption;
    active: boolean;
}

export default function Option(props: IProps) {
    const select = () => {
        props.onSelect(!props.active);
    }

    return (
        <div className="rowStyle">
            &nbsp;&nbsp;
            {props.showCheckbox && <input type="checkbox" checked={props.active} onClick={select} className="checkboxSize"/>}
            <div>
                &nbsp;{props.option.Title}
            </div>
        </div>
    );
}