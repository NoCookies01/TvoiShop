import React, { SyntheticEvent } from "react";
import IItem from "./nestedSelect/item";
import NestedSelect from "./nestedSelect/NestedSelect";

interface IProps {
  sortBy: (property: string) => void;
  filterBy: (value: string, property: string) => void;
  filterCriteria: IItem[];
  resetFilter: () => void;
}

export const InstrumentPanel = (props:IProps) => {

  const filterBy = (values: string[]) => {
    const value = values[values.length - 1];
    const property = values.slice(0, values.length - 1).reduce((p, c) => {
      p += `.${c}`;

      return p;
    });
    
    props.filterBy(value, property);
  };

  return(
    <div className="instrPanel">

      <div className="column">
      <NestedSelect 
        onSelect={filterBy} 
        items={props.filterCriteria}
        reset={props.resetFilter}
      />
      </div>

      <div className="column"> 
        <select onChange={(e: SyntheticEvent<HTMLSelectElement, Event>) => props.sortBy(e.currentTarget.value)} className="filterByStyle">
          <option value="" className="filterByItemStyle">Sort by</option>
          <option value="price" className="filterByItemStyle">Price</option>
          <option value="popularity" className="filterByItemStyle">Popularity</option>
        </select>
      </div>

    </div>
  );
}
