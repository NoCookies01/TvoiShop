import React, { useEffect, useState } from "react";
import IItem from "./item";
import MultiItem from "./MultiItem";
import SingleItem from "./SingleItem";
import OutsideAlerter from "../helpers/Outside";

import './nestedSelect.css';
import translationService from "../../services/translation.service";

interface IProps {
    items: IItem[];
    defaultText: string;
    onSelect: (value: IItem[]) => void;
    reset?: () => void;
}

export default function NestedSelect({ items, defaultText, onSelect, reset }: IProps){
    const [selectedItem, selectItem] = useState<IItem[]>([{Value: defaultText, Title: defaultText}]);
    const [isExpand, setExpand] = useState(false);

    const select = (value: IItem[]) => {
        onSelect(value);
        selectItem(value);
        setExpand(false);
    };

    const resetClick = () => {
        if (reset) reset();
        setExpand(false);
        selectItem([{Value: defaultText, Title: defaultText}]);
    }

    return (
        <div className="nestedList">
            <div className="multiItem textBold" onClick={() => setExpand(!isExpand)}>{selectedItem[selectedItem.length-1].Title}</div>
            <div className="nestedItems">{items.map((child, key) => child.Items && child.Items.length > 0 ?
                <MultiItem onSelect={select} item={child} key={key} /> :
                <SingleItem onSelect={select} item={child} key={key} />
            )}
            </div>
        </div>
    );
};