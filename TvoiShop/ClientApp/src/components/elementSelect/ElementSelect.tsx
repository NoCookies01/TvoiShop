import React from "react";
import IOption from "./Item";
import Option from "./Option";

import './elementSelect.css';

interface IActive {
    active?: boolean;
}

type selectBahaviour = "single" | "multiple";
type activableOption = IOption & IActive;

interface IProps {
    type: selectBahaviour;
    checkbox?: boolean;
    options: IOption[];
    onSelectValues: (values: string[]) => void;
}

export default function ElementSelect(props: IProps){
    const [options, setOptions] = React.useState<activableOption[]>(props.options);
    
    React.useEffect(() => {
        if (!props.options.every(po => options.findIndex(o => po.Value === o.Value) !== -1)) {
            setOptions(props.options);
        }
    }, [props.options]);

    const select = (id: number, selected?: boolean) => {
        const copy = options.map(o => {return {...o}});
        if (props.type === 'single') {
            copy.forEach(c => c.active = false);
        }
        copy[id].active = selected;

        setOptions(copy);
        props.onSelectValues(copy.filter(c => c.active).map(c => c.Value));
    }

    return (
        <div className="rowStyle">
            {options.map((o, id) => (
                <Option 
                    key={id} 
                    option={o}
                    showCheckbox={props.checkbox}
                    onSelect={(selected?: boolean) => select(id, selected)}
                    active={o.active ?? false}
                />
            ))}
        </div>
    );
}