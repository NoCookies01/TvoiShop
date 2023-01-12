import React, { useState } from "react";
import IItem from "./item";
import SingleItem from "./SingleItem";
import {ReactComponent as ExpandLessIcon} from "../../images/expandLessIcon.svg";
import {ReactComponent as ExpandMoreIcon} from "../../images/expandMoreIcon.svg";
import OutsideAlerter from "../helpers/Outside";

interface IProps {
  item: IItem;
  onSelect: (value: string[]) => void;
}

export default function MultiItem({ item, onSelect }: IProps){
    const [open, setOpen] = useState(false);
  
    const handleClick = () => {
      setOpen((prev) => !prev);
    };

    const select = (values: string[]) => {
      var value = [item.Value];
      if (item.Path) {
        value = [item.Path, item.Value]
      }
      onSelect([...value, ...values]);
    }
  
    return (
      <React.Fragment>
        <OutsideAlerter onOutsideClick={() => setOpen(false)}>
          <div className="multiItem" onClick={handleClick}>
            <div>{item.Title}</div>
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
          {open && <div className="multiSubMenu nestedItems">
            {item.Items!.map((child, key) => child.Items && child.Items.length > 0 ?
              <MultiItem onSelect={select} item={child} key={key}/> :
              <SingleItem onSelect={select} item={child} key={key} />
            )}
          </div>}
        </OutsideAlerter>
      </React.Fragment>
    );
  };