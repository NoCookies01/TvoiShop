import React, { useEffect, useState } from "react";
import IItem from "./item";
import MultiItem from "./MultiItem";
import SingleItem from "./SingleItem";
import OutsideAlerter from "../helpers/Outside";

import './nestedSelect.css';

interface IProps {
    items: IItem[];
    onSelect: (value: string[]) => void;
}

export default function NestedSelect({ items, onSelect }: IProps){
    const [selectedItem, selectItem] = useState(["Filter by"]);
    const [isExpand, setExpand] = useState(false);

    const select = (value: string[]) => {
        onSelect(value);
        selectItem(value);
        setExpand(false);
    };

    return (
        <div>
            <div onClick={() => setExpand(!isExpand)}>{selectedItem[selectedItem.length-1]}</div>
            {isExpand &&<OutsideAlerter onOutsideClick={() => setExpand(false)}><div className="nestedItems">{items.map((child, key) => child.Items && child.Items.length > 0 ?
                <MultiItem onSelect={select} item={child} key={key}/> :
                <SingleItem onSelect={select} item={child} key={key} />
            )}</div></OutsideAlerter>}
        </div>
    );
};