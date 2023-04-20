import React, { useState } from "react";
import IItem from "./item";
import SingleItem from "./SingleItem";
import {ReactComponent as ExpandLessIcon} from "../../images/expandLessIcon.svg";
import {ReactComponent as ExpandMoreIcon} from "../../images/expandMoreIcon.svg";
import OutsideAlerter from "../helpers/Outside";

interface IProps {
  item: IItem;
  onSelect: (value: IItem[]) => void;
}

export default function MultiItem({ item, onSelect }: IProps){
    const [open, setOpen] = useState(false);
  
    const handleClick = () => {
      setOpen((prev) => !prev);
    };

    const select = (values: IItem[]) => {
      var value = [item];
      if (item.Path) {
        value = [{Title: item.Title, Value: item.Path}, {Title: item.Title, Value: item.Value}];
      }
      onSelect([...value, ...values]);
    }
  
    return (
      <React.Fragment>
        <OutsideAlerter onOutsideClick={() => setOpen(false)}>
          <div onClick={handleClick} className="singleItem">
            {item.Title}
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
          {open && <div className="multiSubMenu nestedItems ">
            {item.Items!.map((child, key) => child.Items && child.Items.length > 0 ?
              <MultiItem onSelect={select} item={child} key={key}/> :
              <SingleItem onSelect={select} item={child} key={key} />
            )}
          </div>}
        </OutsideAlerter>
      </React.Fragment>
    );
  };