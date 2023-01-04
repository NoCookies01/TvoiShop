import React, { SyntheticEvent } from "react";
import getSortCriteria from "../data/sortCriteria";
import translationService from "../services/translation.service";
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

  const sortBy = (values: string[]) => props.sortBy(values[0]);

  return(
    <div className="instrPanel">
      <div className="column">
        <NestedSelect 
          onSelect={filterBy} 
          defaultText={translationService.translate("filter by|A")}
          items={props.filterCriteria}
          reset={props.resetFilter}
        />
      </div>
      <div className="column"> 
        <NestedSelect 
          onSelect={sortBy}
          defaultText={translationService.translate("sort by|A")}
          items={getSortCriteria()}
          reset={props.resetFilter}
        />
      </div>
    </div>
  );
}
