import React, { useEffect, useState } from "react";
import IItem from "./item";
import MultiItem from "./MultiItem";
import SingleItem from "./SingleItem";
import OutsideAlerter from "../helpers/Outside";

import './nestedSelect.css';

interface IProps {
    items: IItem[];
    onSelect: (value: string[]) => void;
    reset: () => void;
}

export default function NestedSelect({ items, onSelect, reset }: IProps){
    const [selectedItem, selectItem] = useState(["Filter by"]);
    const [isExpand, setExpand] = useState(false);

    const select = (value: string[]) => {
        onSelect(value);
        selectItem(value);
        setExpand(false);
    };

    const resetClick = () => {
        reset();
        setExpand(false);
        selectItem(["Filter by"]);
    }

    return (
        <div className="nestedList">
            <div onClick={() => setExpand(!isExpand)}>{selectedItem[selectedItem.length-1]}</div>
            {isExpand && <OutsideAlerter onOutsideClick={() => setExpand(false)}><div className="nestedItems">{items.map((child, key) => child.Items && child.Items.length > 0 ?
                <MultiItem onSelect={select} item={child} key={key} /> :
                <SingleItem onSelect={select} item={child} key={key} />
            )}
            <button className="btnHomeStyleWhite" onClick={resetClick}>Reset</button></div></OutsideAlerter>}
        </div>
    );
};