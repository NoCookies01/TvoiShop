import React, { SyntheticEvent, useState } from "react";
import getSortCriteria, { SortOrder } from "../data/sortCriteria";
import translationService from "../services/translation.service";
import IItem from "./nestedSelect/item";
import NestedSelect from "./nestedSelect/NestedSelect";
import {ReactComponent as FilterIcon} from '../images/filter.svg';
import '../styles/shoppingCart.css'
import './nestedSelect/nestedSelect.css';
import {ReactComponent as CancelIcon} from '../images/cancel.svg';

interface IProps {
  sortBy: (property: string, sortOrder: SortOrder) => void;
  filterBy: (value: string, property: string) => void;
  filterCriteria: IItem[];
  resetFilter: () => void;
}

export const InstrumentPanel = (props:IProps) => {

  const[filterWindow, setFilterWindow] = useState(false);
  
  const handleClick = () => {
    setFilterWindow((prev) => !prev);
  };

  const resetFilter = () =>{
    props.resetFilter();
  }

  const filterWindowClose = () => {
    setFilterWindow(false);
  };

  const filterBy = (values: IItem[]) => {
    const value = values[values.length - 1].Value;
    const property = values.slice(0, values.length - 1).map(c => c.Value).reduce((p, c) => {
      p += `.${c}`;

      return p;
    });
    
    props.filterBy(value, property);
  };

  const onSort = (values: IItem[]) => {
    const value = values[0];
    const criteria = getSortCriteria().find(c => c.Value === value.Value && c.Title === value.Title);

    props.sortBy(value.Value, criteria!.SortOrder);
  }

  return(
    <div className="instrPanel">
      <div className="filter" onClick={handleClick}><FilterIcon />{translationService.translate("filter|A")}</div>
      {filterWindow && 
      <div className="columnStyle filterPanelStyle">
        <CancelIcon className="icon positionRightAbsolute" onClick={filterWindowClose}/> 
        <div>
          <NestedSelect
            onSelect={filterBy}
            defaultText={translationService.translate("filter by|A")}
            items={props.filterCriteria}/>
        </div>
        <div>
            <NestedSelect
              onSelect={onSort}
              defaultText={translationService.translate("sort by|A")}
              items={getSortCriteria()}/>
        </div>
        <button className="btnFilter" onClick={filterWindowClose}>{translationService.translate("showResult|A")}</button>
        <button className="btnFilterCancel" onClick={resetFilter}>{translationService.translate("reset|A")}</button>
      </div>}
    </div>
  );
}
