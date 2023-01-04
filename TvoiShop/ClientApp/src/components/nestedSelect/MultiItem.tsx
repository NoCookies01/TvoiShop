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
  
    return (
      <React.Fragment>
        <OutsideAlerter onOutsideClick={() => setOpen(false)}>
          <div className="multiItem" onClick={handleClick}>
            <div>{item.Title}</div>
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
          {open && <div className="multiSubMenu nestedItems">
            {item.Items!.map((child, key) => child.Items && child.Items.length > 0 ?
              <MultiItem onSelect={(value) => onSelect([item.Value, ...value])} item={child} key={key}/> :
              <SingleItem onSelect={(value) => onSelect([item.Value, ...value])} item={child} key={key} />
            )}
          </div>}
        </OutsideAlerter>
      </React.Fragment>
    );
  };